describe(`Add A Rating`, () => {
    it(`Should Fail Due to Missing Fields`, () => {
        cy.visit('http://localhost:3199/user/8', {timeout: 30000})
        cy.get(`button`, {timeout: 10000}).contains('Recipes').click()
        cy.get(`button`, {timeout: 10000}).contains('View').click()
        cy.get(`#submitRating`, {timeout: 10000}).click()
        cy.on('window:alert', (text) => {
            expect(text).to.contains('Error: Both difficulty and stars are required');
        });
    })

    it(`Should Add A Rating`, () => {
        const rnd = Math.floor(Math.random() * 100000)
        cy.intercept(`/api/rating`).as('postAttempt')
        cy.visit('http://localhost:3199/user/8', {timeout: 30000})
        cy.get(`button`, {timeout: 10000}).contains('Recipes').click()
        cy.get(`button`, {timeout: 10000}).contains('View').click()
        cy.get(`#difficultyStars`, {timeout: 10000}).click()
        cy.get(`#ratingStars`, {timeout: 10000}).click()
        cy.get('#reviewText', {timeout: 10000}).type(`${rnd}testreview :-)`)
        cy.get(`#submitRating`, {timeout: 10000}).click()
        cy.wait('@postAttempt', {timeout: 10000}).then((interception) => {
            assert.equal(interception.response.statusCode, 200, `post successful`)
        })
        cy.get('div', {timeout: 10000}).contains(`${rnd}testreview :-)`)
    })
})
