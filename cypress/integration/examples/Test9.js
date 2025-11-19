/// <reference types="cypress" /> 
describe('Handles Web tabs  ', () => {

    it('Verify Date selection ', () => {

        //handling child  winodows and tabs 
        const monthNUmber = 6;
        const date = 18 ;
        const year = 2027 ;
        //   cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/offers/')
    
           cy.visit( Cypress.env("url") +"/seleniumPractise/#/offers/")
        cy.get(".react-date-picker__inputGroup__day").click()
         cy.get(".react-date-picker__inputGroup__day").click()
        
         cy.contains("button",year ).click()
          cy.contains("button",monthNUmber ).click()
          cy.contains("button",date ).click()
       
         cy.get(".react-date-picker__inputGroup__day").should('have.text',date)
         cy.get(".react-date-picker__inputGroup__month").should('have.text',monthNUmber)
       

    })
})