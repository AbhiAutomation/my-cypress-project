///<refrence    types="cypress"/>   
//above line is for intellisense support
//https://docs.cypress.io/guides/references/configuration

describe('My First Test', () => {

    it('Visits AutomationSites for practice title', () => {

        //check boxes handling
        cy.visit('https://rahulshettyacademy.com/AutomationPractice/')
        cy.title().should('include', 'Practice Page')
        cy.get('#checkBoxOption1').check().should('be.checked').and('have.value', 'option1')
        cy.get('#checkBoxOption1').uncheck().should('not.be.checked')
        cy.get('input[type="checkbox"]').check(['option2', 'option3'])
        //static dropdown
        cy.get('select').select('option2').should('have.value', 'option2')  
        //dynamic dropdown
        cy.get('#autocomplete').type('ind')
        cy.get('.ui-menu-item div').each(($el, index, $list) => {
            if ($el.text() === "India") {
                cy.wrap($el).click()
            }
        })
        //vistify if text box has value India   
        cy.get('#autocomplete').should('have.value', 'India')
        //visible invisible
        cy.get('#displayed-text').should('be.visible')
        cy.get('#hide-textbox').click()
        cy.get('#displayed-text').should('not.be.visible')
       cy.get('#show-textbox').click()
       cy.get('#displayed-text').should('be.visible')
        //radio button
       cy.get('[value="radio2"]').check().should('be.checked')

       //alert
       cy.get('#alertbtn').click()  
       cy.get('[value="Confirm"]').click()
       //window:alert
       cy.on('window:alert', (str) => {
        //Mocha
        expect(str).to.equal('Hello , share this practice page and share your knowledge')
       })
       cy.on('window:confirm', (str) => {
        //Mocha
        expect(str).to.equal('Hello , Are you sure you want to confirm?')
       })

       //cy.on('window:alert')  //to capture alert pop up text
       //cy.on('window:confirm')  //to capture confirm pop up text
   
       //handling child tabs
       cy.get('#opentab').invoke('removeAttr', 'target').click()
       //opening in same tab by removing target attribute using invoke function
       //cy.url()  //gives current url of the page
       //should is an assertion in cypress which is by default chai assertion and automaticlly comple all promise
       cy.url().should('include', 'https://www.qaclickacademy.com/')
       cy.go('back')  //to navigate back to previous page

       //with new switch new tab handling is not required
       cy.get('#opentab').click()
       cy.url().should('include', 'https://www.qaclickacademy.com/')
         
    })  

})