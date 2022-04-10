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
        cy.intercept(`/api/recipes`).as('postAttempt')
        cy.visit('http://localhost:3199/user/8', {timeout: 30000})
        var recipeTab = cy.get(`button`, {timeout: 10000}).contains('Recipes')
        recipeTab.click()
        var addButton = cy.get(`button`, {timeout: 10000}).contains('Add')
        addButton.click()
        var submit = cy.get(`button`, {timeout: 10000}).contains('Submit')

        //inserting data
        //name
        cy.get('#mui-27').type('Name')
        //description
        cy.get('#mui-28').type('Description')
        //direction
        cy.get('#mui-29').type('Direction')
        //time
        cy.get('#mui-30').type(10)

        cy.get('[role="button"]').eq(3).click()
        cy.get('li').eq(0).click()
        //var y = x[0]
        //y.click()
        //expect().equal(null)

        
        //cy.get('select').select('user-1')

        /*
        cy.wait('@postItem', {timeout: 10000}).then((interception) => {
            // check out interceptions
            // https://docs.cypress.io/guides/guides/network-requests#Waiting
            // https://docs.cypress.io/api/commands/intercept#Intercepted-responses
            // https://docs.cypress.io/api/commands/intercept#Interception-lifecycle
            assert.equal(interception.response.statusCode, 200, `${titles[i]} post successful`)
        })

        // look at assertions
        // https://docs.cypress.io/guides/references/assertions#TDD-Assertions
        cy.get(`#${item}`).should('exist')
        */
    })
})