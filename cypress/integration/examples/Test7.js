/// <reference types="cypress" /> 
describe('Handles Web tabs  ', () => {

    it('Visits AutomationSites for child window handling', () => {

        //handling child  winodows and tabs 
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
        cy.title().should('include', 'Practice Page')
        cy.get("#opentab").then(function (el) {
            const url = el.prop('href')
            cy.log(url)
            cy.visit(url)//visiting url directly without clicking on link
            cy.origin('https://www.qaclickacademy.com/',  () => {
                cy.get("#navbarSupportedContent a[href*='about'] ").click()
                cy.get(".mt-50 h2").should('contain.text', 'Welcome to QAClick Academy')
                cy.url().should('include', 'qaclickacademy')
            })
          //  cy.get("#opentab").click()// will not allow in cypress as it is cross origin
          //  //opening in same tab by removing target attribute using invoke function
          //  //cy.url()  //gives current url of the page
          //  //should is an assertion in cypress which is by default chai assertion and automaticlly comple all promise
          //  cy.url().should('include', 'qaclickacademy')
          //  cy.go('back')  //to navigate back to previous page



        })


    })
})