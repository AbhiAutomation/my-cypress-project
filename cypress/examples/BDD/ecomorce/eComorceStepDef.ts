import { Given ,When,Then} from "@badeball/cypress-cucumber-preprocessor";
import HomePage from "cypress/support/pageObjects/HomePage";    


Given('I am on EComercePage', () => {
  const homePage = new HomePage();
  cy.visit('https://example-ecommerce.com');
});

When('add items to the cart', () => {
  const homePage = new HomePage();
 
});

Then('validate the total prices', () => {
  const homePage = new HomePage();
  });