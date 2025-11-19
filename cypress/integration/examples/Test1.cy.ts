/// <reference types="cypress" />   
//above line is for intellisense support
//https://docs.cypress.io/guides/references/configuration
//https://docs.cypress.io/api/table-of-contents
//Cypress framework support bydefult Mocha and Chai
//Mocha is test runner and Chai is assertion library
//BDD style of writing test cases
describe('My First Test', () => {

    it('Visits AutomationSites for practice title', () => {
        cy.visit('https://qaautomationlabs.com/')
        cy.title().should('include', 'Home - QA Automation Labs')
    })

    it('rahulsheetysits the page and verifies the title', () => {
        cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/')
        cy.title().should('include', 'GreenKart - veg and fruits kart')
        //In Selenium we use driver.findElement(By.css())
        //In Cypress we use cy.get('css')
        //in selenium  get hit  url ini browser and in Cypress visit does that
        cy.get('.search-keyword').type('ca')
        cy.get('.search-keyword').should('have.length', 1)
        //Very Important  functioality in cypress 
       // cy.get('.product').should('have.length', 4) //will fail as it counts hidden elements also
        cy.get('.product').should('have.length', 4)//visible elements only
        //.find() is like findElement in selenium which is used to find child elements after getting parent element
        //parent child relationship
        cy.get('.products').as('productLocator') //alias
        cy.get('@productLocator').find('.product').should('have.length', 4)
        console.log('hello')
             cy.get('@productLocator').find('.product').each(($el, index, $list) => {
            const textVeg = $el.find('h4.product-name').text()
            if (textVeg.includes('Cashews')) {
                //click on Add to cart
                cy.wrap($el).find('button').click()
            }
        })
        //assert ig logo text is GreenKart
        //cy.get('.brand').should('have.text', 'GREENKART')
        //jquery text() method to get text of an element

        cy.get('.brand').should('have.text', 'GREENKART')
        //should is an assertion in cypress which is by default chai assertion and automaticlly comple all promise 
        //chai is assertion library
        //chai comes with cypress by default
       const logo = cy.get('.brand')  //gives error as cy is not defined
        //cy.log(logo)  //gives error as cy is not defined
        //to print in cypress test runner console use cy.log()
        //Thisd is print to log in cypress test runner console
        cy.get('.brand').then(function (logoElement) {
            cy.log(logoElement.text())
            
        })
        //if const log = cy.get('.brand) then it will give error as cy is not defined because  you are assiging the cypress function to varible 

        //cy.log() is used to print in cypress test runner console
        //cy.log(logoElement.text())
        cy.get('.brand').should('have.text', 'GREENKART')
        //const logo = cy.get('.brand').text() giving error as cy is not defined
     //  const logo = cy.get('.brand').text
       // cy.log(logo)
    })



})