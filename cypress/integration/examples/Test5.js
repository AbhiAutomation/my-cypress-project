/// <reference types="cypress" /> 
describe('Handles Web Table  ', () => {

    it('Visits AutomationSites for child window handling', () => {   

        //handling child tabs
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
        cy.title().should('include', 'Practice Page')
        
        cy.get("tr td:nth-child(2)").each(($el, index, $list) => {
            const text = $el.text() 
            if (text.includes('Python')) {
                //cy.wrap($el).next().then(function(price) {
                cy.get("tr td:nth-child(2)").eq(index).next().then(function(price) {
                    const priceText = price.text()
                    expect(priceText).to.equal('25')
                })
                //another way
                //cy.wrap($el).next().should('have.text', '25')
            }
        })
       
    })
})