describe(`Add A Recipe`, () => {
    it(`Should Fail Due to Missing Fields`, () => {
        // should reseed the db instead of randomly generating a name
        cy.intercept(`/api/recipes`).as('postAttempt')
        cy.visit('http://localhost:3199/user/8', {timeout: 30000})
        var recipeTab = cy.get(`button`, {timeout: 10000}).contains('Recipes')
        recipeTab.click()
        var addButton = cy.get(`button`, {timeout: 10000}).contains('Add')
        addButton.click()
        var submit = cy.get(`button`, {timeout: 10000}).contains('Submit')
        submit.click()
        cy.on('window:alert', (text) => {
            expect(text).to.contains('Missing Fields');
        });
    })

    it(`Should Add A Recipe`, () => {
        const rnd = Math.floor(Math.random() * 100000)
        cy.intercept(`/api/recipes`).as('postAttempt')
        cy.visit('http://localhost:3199/user/8', {timeout: 30000})
        cy.get(`button`, {timeout: 10000}).contains('Recipes').click()
        cy.get(`button`, {timeout: 10000}).contains('Add').click()

        //inserting data
        //name
        cy.get('#mui-27').type(`${rnd}`)
        //description
        cy.get('#mui-28').type('Description')
        //direction
        cy.get('#mui-29').type('Direction')
        //time
        cy.get('#mui-30').type(10)

        cy.get('[role="button"]').eq(3).click()
        cy.get('li').eq(0).click()
        cy.get('[role="button"]').eq(4).click()
        cy.get('li').eq(0).click()
        cy.get('#mui-31').type(10)

        cy.get(`button`, {timeout: 10000}).contains('Submit').click()
        
        cy.wait('@postAttempt', {timeout: 10000}).then((interception) => {
            assert.equal(interception.response.statusCode, 200, `post successful`)
        })
    })
})