/// <reference types="cypress" /> 

import userdata from '../../fixtures/user.json'
import ConfirmationPage from '../../support/pageObjects/ConfirmationPage';
import HomePage from '../../support/pageObjects/HomePage';

  
describe('End to End Ecommerce  ', () => {

   let homePage: HomePage;
   let confirmationPage: ConfirmationPage;

beforeEach(() => {

     homePage= new HomePage();
     confirmationPage= new ConfirmationPage();
   //  productPage= new productPagefrom();

    // runs before each test in the block
    //cy.visit("https://rahulshettyacademy.com/loginpagePractise/#/");  
   //cy.fixture('user').then(function(data)
   // {
     //  this.data=data
   // })
  })   
   it('Verify Date selection ', () => {
      homePage.goTo(Cypress.env("url") +"/loginpagePractise/#/");
       const productPage=homePage.login("rahulshettyacademy", "learning")
       productPage.pageValidation()
       productPage.verifyCardLimit()
       productPage.selectProduct("Blackberry")
      // cy.pause()
     cy.debug()
       productPage.selectFirstProduct()
       const cartPage= productPage.goToCart()
        /**
         *  expect(sum).to.lessThan(200000)
         *  cy.log(sum) if you not using then()  it will give random anwer may be 0 or  some other value
         *  because of asyncronous behaviour of cypress  
         */
      cartPage.verifyTotalAmount()
      confirmationPage = cartPage.checkoutItems();
      confirmationPage.submitFormDetails();
      confirmationPage.getSuccessMessage().should('have.text','Success!')
   })
})