function parseDomNodeText(text) {
    return parseFloat(text.innerText.split(" ")[0])
}

function minDomNode(arr) {
    if (!arr || arr.length < 1) { return null }

    let min = Number.MAX_VALUE
    for (let i = 0; i < arr.length; i++) {
        min = Math.min(parseDomNodeText(arr[i]), min)
    }

    return min
}

function maxDomNode(arr) {
    if (!arr || arr.length < 1) { return null }

    let max = -1
    for (let i = 0; i < arr.length; i++) {
        max = Math.max(parseDomNodeText(arr[i]), max)
    }

    return max
}

function openFirstRecipe() {
    cy.get("div#recipeTable div.MuiDataGrid-row button").then((viewButtons) => {
        expect(viewButtons.length).to.be.greaterThan(0)
        viewButtons[0].click()
        cy.get("div.MuiTypography-root").contains("Recipe Viewer").then((header) => {
            expect(header).not.to.be.null
        }).then(() => {
            cy.get("div.MuiModal-root div.MuiPaper-root div.MuiBox-root button").contains("Save Recipe").then((saveButton) => {
                expect(saveButton[0].disabled).to.be.false
                saveButton[0].click()
                expect(saveButton[0].disabled).to.be.true
            }).then(() => {
                cy.get('div.MuiModal-root div#viewRecipeModalHeader button.MuiIconButton-root').click()
            })
        })
    })
}

function saveCurrOpenRecipe() {
    cy.get("div.MuiModal-root div.MuiPaper-root div.MuiBox-root button").contains("Save Recipe").then((saveButton) => { console.log(saveButton)
        expect(saveButton[0].disabled).to.be.false
        saveButton.click()
        expect(saveButton[0].disabled).to.be.true
    })
}

function closeCurrOpenRecipe() {
    cy.get('div.MuiModal-root button.MuiIconButton-root').click()
}

describe("View/filter recipes", () => {
    before(() => {
        cy.visit('http://localhost:3197/user/9', {timeout: 30000})
        cy.get(`button`, { timeout: 1000 }).contains('Recipes').click()
    })

    it("Should sort Recipes", () => {
        cy.get('div#recipeTable div.MuiDataGrid-row div.MuiDataGrid-cell[data-field="time"] div.MuiDataGrid-cellContent', { timeout: 1000 }).then((initTimes) => {
            cy.get('div#recipeTable div.MuiDataGrid-columnHeader--sortable').contains('Time').click()
            cy.get('div#recipeTable div.MuiDataGrid-row div.MuiDataGrid-cell[data-field="time"] div.MuiDataGrid-cellContent', { timeout: 1000 }).then((sort1Times) => {
                cy.get('div#recipeTable div.MuiDataGrid-columnHeader--sortable').contains('Time').click()
                cy.get('div#recipeTable div.MuiDataGrid-row div.MuiDataGrid-cell[data-field="time"] div.MuiDataGrid-cellContent', { timeout: 1000 }).then((sort2Times) => {
                    cy.get('div#recipeTable div.MuiDataGrid-columnHeader--sortable').contains('Time').click()
                    cy.get('div#recipeTable div.MuiDataGrid-row div.MuiDataGrid-cell[data-field="time"] div.MuiDataGrid-cellContent', { timeout: 1000 }).then((sort3Times) => {
                        expect(initTimes.length).to.equal(sort1Times.length)
                        expect(sort1Times.length).to.equal(sort2Times.length)
                        expect(sort2Times.length).to.equal(sort3Times.length)

                        for (let i = 0; i < initTimes.length; i++) {
                            expect(initTimes[i].innerText).to.equal(sort3Times[i].innerText)
                        }

                        expect(parseDomNodeText(sort1Times[0])).to.equal(minDomNode(sort1Times))
                        expect(parseDomNodeText(sort1Times[sort1Times.length - 1])).to.equal(maxDomNode(sort1Times))

                        expect(parseDomNodeText(sort2Times[0])).to.equal(maxDomNode(sort2Times))
                        expect(parseDomNodeText(sort2Times[sort1Times.length - 1])).to.equal(minDomNode(sort2Times))
                    })
                })
            })
        })
    })

    it("Should view and save recipes", () => {
        openFirstRecipe()
        // // saveCurrOpenRecipe()
        // closeCurrOpenRecipe()
    })

    it.only("Should filter recipes", () => {
        cy.get('div#recipeFilter div#restrictionModalBtn').click()
        cy.get('input#autocomplete-restrictions').type("Vegan").wait(500)
        cy.get('input#autocomplete-restrictions').type("{enter}").wait(500)
        cy.get('input#autocomplete-restrictions').type("Gluten-Free").wait(500)
        cy.get('input#autocomplete-restrictions').type("{enter}").wait(500)
        cy.get('div#restrictionsModal button.MuiButton-contained').click()

        cy.get('div#recipeFilter div#equipmentModalBtn').click()
        cy.get('input#autocomplete-equipment').type("Wok").wait(500)
        cy.get('input#autocomplete-equipment').type("{enter}").wait(500)
        cy.get('input#autocomplete-equipment').type("Spoon").wait(500)
        cy.get('input#autocomplete-equipment').type("{enter}").wait(500)
        cy.get('div#equipmentModal button.MuiButton-contained').click()

        cy.get('div#recipeFilter div#ingredientModalBtn').click()
        cy.get('input#autocomplete-ingredients').type("Sugar").wait(500)
        cy.get('input#autocomplete-ingredients').type("{enter}").wait(500)
        cy.get('div#ingredientsModal button.MuiButton-contained').click()

        openFirstRecipe()
        
        cy.get("input.PrivateSwitchBase-input").then((checkBoxes) => {
            cy.get("div#recipeTable div.MuiDataGrid-row").then((initList) => {
                checkBoxes[0].click()
                cy.get("div#recipeTable div.MuiDataGrid-row").then((currList) => {
                    expect(initList.length).to.be.greaterThan(currList.length)
                }).then(() => {
                    checkBoxes[0].click()
                    checkBoxes[1].click()
                    cy.get("div#recipeTable div.MuiDataGrid-row").then((currList) => {
                        expect(initList.length).to.be.greaterThan(currList.length)
                    }).then(() => {
                        checkBoxes[1].click()
                        checkBoxes[2].click()
                        cy.get("div#recipeTable div.MuiDataGrid-row").then((currList) => {
                            expect(initList.length).to.be.greaterThan(currList.length)
                        }).then(() => {
                            checkBoxes[2].click()
                            checkBoxes[3].click()
                            cy.get("div#recipeTable div.MuiDataGrid-row").then((currList) => {
                                expect(initList.length).to.be.greaterThan(currList.length)

                                cy.get('div#recipeFilter div#restrictionModalBtn').click()
                                cy.get('div#restrictionsModal div.MuiListItemIcon-root').each((delButton) => { delButton.click() })
                                cy.wait(500)
                                cy.get('div#restrictionsModal button.MuiButton-contained').click()

                                cy.get('div#recipeFilter div#equipmentModalBtn').click()
                                cy.get('div#equipmentModal div.MuiListItemIcon-root').each((delButton) => { delButton.click() })
                                cy.wait(500)
                                cy.get('div#equipmentModal button.MuiButton-contained').click()

                                cy.get('div#recipeFilter div#ingredientModalBtn').click()
                                cy.get('div#ingredientsModal div.MuiListItemIcon-root').each((delButton) => { delButton.click() })
                                cy.wait(500)
                                cy.get('div#ingredientsModal button.MuiButton-contained').click()
                                
                                cy.get('div#recipeFilter div#recipeModalBtn').click()
                                cy.get('div#recipesModal div.MuiListItemIcon-root').each((delButton) => { delButton.click() })
                                cy.get('div#recipesModal button.MuiButton-contained').click()
                                
                            })
                        })
                    })
                })
            })
        })
    })
})