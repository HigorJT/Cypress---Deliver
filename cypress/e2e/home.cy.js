
describe('Home page', () => {
    it('App deve está online', () => {
        cy.viewport(1440, 900)
        cy.visit('https://buger-eats-qa.vercel.app')
        cy.get('h1').should('have.text', 'Seja um parceiro entregador pela Buger Eats')
        
    })
})