
describe('Ingredient creation', () => {
	it('should create a new ingredient', () => {
		// should reseed the db instead of randomly generating a name
		const ingName = `testIngredient${Math.floor(Math.random() * 1000)}` 
		cy.intercept('/api/ingredients').as('postItem')
		cy.visit('http://localhost:3199/user/8', {timeout: 30000})
		cy.get('#autocomplete-ingredients', {timeout: 10000}).type(`${ingName}{enter}`)
		cy.wait('@postItem', {timeout: 10000}).then((interception) => {
			// check out interceptions
			// https://docs.cypress.io/guides/guides/network-requests#Waiting
			// https://docs.cypress.io/api/commands/intercept#Intercepted-responses
			// https://docs.cypress.io/api/commands/intercept#Interception-lifecycle
			assert.equal(interception.response.statusCode, 200, "Ingredient post successful")
		})

		// look at assertions
		// https://docs.cypress.io/guides/references/assertions#TDD-Assertions
		cy.get(`ingredients__${ingName}`).should('exist')
	})
})

