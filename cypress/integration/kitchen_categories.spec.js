/*
const categories = ['ingredients', 'equipment', 'restrictions']
const titles = ['Ingredients', 'Equipment', 'Restrictions']
for(let i = 0; i < 3; i++){
	const rnd = Math.floor(Math.random() * 100000)
	describe(`${titles[i]} creation`, () => {
		const item = `test${titles[i]}${rnd}` 
		it(`should create a new ${categories[i]}`, () => {
			// should reseed the db instead of randomly generating a name
			cy.intercept(`/api/${categories[i]}`).as('postItem')
			cy.visit('http://localhost:3199/user/8', {timeout: 30000})
			cy.get(`#autocomplete-${categories[i]}`, {timeout: 10000}).type(`${item}{enter}`)
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
		})
	})
}

*/