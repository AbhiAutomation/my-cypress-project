/// <reference types="cypress" /> 
describe('Handles New  window and tabs ', () => {

    it('Visits AutomationSites for child window handling', () => {   

        //handling child tabs
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
        cy.title().should('include', 'Practice Page')
      cy.get('#opentab').invoke('removeAttr', 'target').click()
     
     //   cy.get('#opentab').click() // it will open new tab
        //opening in same tab by removing target attribute using invoke function
        //cy.url()  //gives current url of the page
        //should is an assertion in cypress which is by default chai assertion and automaticlly comple all promise
        //cy.url().should('include', 'https://www.qaclickacademy.com/')
        //cy.go('back')  //to navigate back to previous page
        //with new switch new tab handling is not required
        //cy.get('#opentab').click()
        //cy.url().should('include', 'https://www.qaclickacademy.com/')
        //cy.go('back')  //to navigate back to previous page
        cy.origin('https://www.qaclickacademy.com/', { args: {} }, () => {
                cy.get("#navbarSupportedContent a[href*='about'] ").click()
                cy.get(".mt-50 h2").should('contain.text', 'Welcome to QAClick Academy')
            cy.url().should('include', 'https://www.qaclickacademy.com/')
             cy.go('back')  //to navigate back to previous page
    
        })
   
       
    })
})