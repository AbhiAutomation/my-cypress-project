/// <reference types="cypress" />   

describe('My First Test', () => {

    it('rahulsheetysits the page and verifies the title', () => {
        cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/')
        cy.title().should('include', 'GreenKart - veg and fruits kart')
        cy.get('.search-keyword').type('ca')

        cy.get('.products').as('productLocator') //alias
        cy.get('@productLocator').find('.product').should('have.length', 4)

        cy.get('@productLocator').find('.product').each(($el, index, $list) => {
            const textVeg = $el.find('h4.product-name').text()
            if (textVeg.includes('Cashews')) {
                //click on Add to cart
                cy.wrap($el).find('button').click()
            }
        })
        cy.get('.cart-icon > img').click()
        cy.contains('PROCEED TO CHECKOUT').click()
        cy.contains('Place Order').click()
        //assert ig logo text is GreenKart
     
    })



})