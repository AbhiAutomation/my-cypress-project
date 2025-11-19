
import HomePage from "cypress/support/pageObjects/HomePage";
beforeEach(() => {

   
    // runs before each test in the block
    //cy.visit("https://rahulshettyacademy.com/loginpagePractise/#/");  
  cy.fixture('user').then(function(data)
    {
       this.data=data
       this.HomePage= new HomePage();
   })
  })   