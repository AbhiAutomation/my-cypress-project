/// <reference types="cypress" /> 
describe('Handles Web tabs  ', () => {

    it('Visits AutomationSites for child window handling', () => {

        //handling child  winodows and tabs 
    //    cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
           cy.visit( Cypress.env("url") +"/AutomationPractice/")
        cy.title().should('include', 'Practice Page')
        cy.frameLoaded('#courses-iframe') //load iframe
        cy.iframe().find("a[href*='mentorship']").eq(0).click() //click on first element
       
        cy.iframe().find(".bg-pattern-1 h1[class *= 'pricing-title']").should("have.length", 2  )
        //cy.iframe().find("h1[class*='pricing-title']").eq(0).should('have.text', 'Mentorship Program');
    


    })
})


