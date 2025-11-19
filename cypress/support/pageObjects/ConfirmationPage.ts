class ConfirmationPage{
   
    pageValidation(){
        cy.get('h1').should('have.text','Thank you for the order.')
    } 

    submitFormDetails(){
        Cypress.config('defaultCommandTimeout', 30000) //Local override dfalut time out 
       
         cy.get("#country").type("india")
          cy.wait(10000)
      cy.get('div[class*="suggestions"] ul li a').click()
      
      cy.get("#checkbox2").click({force:true})
      cy.get("input[type='submit']").click()
    }
    getSuccessMessage(){
        return cy.get('div[class*="alert alert-success alert-dismissible"] strong')
    }
} export default ConfirmationPage;