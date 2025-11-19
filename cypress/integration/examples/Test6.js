/// <reference types="cypress" /> 
describe('Handles Web Table  ', () => {

    it('Visits AutomationSites for child window handling', () => {   

        //handling moushover
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
        cy.title().should('include', 'Practice Page')
        
        cy.get('.mouse-hover-content').invoke('show')  //to show hidden element
        cy.contains('Top').click({force:true})  //to click hidden element  without opening popup
        cy.url().should('include', 'top')  
        cy.go('back')  //to navigate back to previous page
   t
        
    })
})