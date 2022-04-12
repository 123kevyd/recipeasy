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
    it.only("Should filter recipes", () => {
        // cy.get('div#recipeFilter div#restrictionModalBtn').click()
        // cy.get('input#autocomplete-restrictions').type("vegan{enter}Gluten-Free{enter}Fish Free{enter}")
        // cy.get('div#restrictionsModal button.MuiButton-contained').click()

        // cy.get('div#recipeFilter div#equipmentModalBtn').click()
        // cy.get('input#autocomplete-equipment').type("Wok{enter}Spoon{enter}")
        // cy.get('div#equipmentModal button.MuiButton-contained').click()

        cy.get('div#recipeFilter div#ingredientModalBtn').click()
        cy.get('input#autocomplete-ingredients').type("Wok{enter}Spoon{enter}")
        cy.get('div#ingredientsModal button.MuiButton-contained').click()
        
    })
})