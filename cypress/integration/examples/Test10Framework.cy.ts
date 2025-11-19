/// <reference types="cypress" />

// Type for fixture data
interface UserData {
  username: string;
  password: string;
  productName?: string;
  // add any other keys from your fixture as optional/required
}

describe('End to End Ecommerce', function () {
  // Use Mocha `this` context to store fixture data for the spec
  before(function () {
    // `function` is required so `this` refers to Mocha context
    cy.fixture('user').then((data: UserData) => {
      // attach fixture data to the spec's "this"
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (this as any).data = data;
    });
  });

  it('Verify Date selection', function () {
    // get data from `this`
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = (this as any).data as UserData;

    const productName = 'Blackberry';

    // visit using env url
     cy.visit(`${Cypress.env('url')}/loginpagePractise/#/`);

    // login using fixture data
    cy.get('#username').type("rahulshettyacademy");
    cy.get('#password').type(data.password);
    cy.get('#signInBtn').click();

    // assert redirected to shop
    cy.url().should('include', 'shop');

    // assert cards present
    cy.get('app-card').should('have.length', 4);

    // Find the specific product by name inside app-card
    // The original filter was fragile; use contains on card level
    cy.get('app-card').each(($card) => {
      cy.wrap($card)
        .find('h4') // adjust selector to match product title inside card if needed
        .invoke('text')
        .then((text) => {
          if (text.trim().includes(data.productName ?? productName)) {
            cy.wrap($card).contains('button', 'Add').click();
            // Once found & clicked, we can return false from jQuery each but Cypress each doesn't support break.
            // So we just click the matching one.
          }
        });
    });

    // click first card's Add as well (original behavior)
    cy.get('app-card').eq(0).contains('Add').click();

    // goto checkout
    cy.contains('a', 'Checkout').click();

    // sum up item prices
    let sum = 0;

    // iterate over price elements and accumulate
    cy.get('tr td:nth-child(4) strong').each(($el) => {
      const amountText = $el.text(); // e.g. "₹. 50000" or "Rs. 50"
      // extract numeric portion (assumes "symbol <space>number" or similar)
      // split by space and take last token
      const parts = amountText.split(' ');
      const valueToken = parts[parts.length - 1].trim();
      // strip any non-digit characters except dot and minus
      const numericString = valueToken.replace(/[^\d.-]/g, '');
      const value = Number(numericString) || 0;
      sum += value;
    })
    .then(() => {
      // now that each() finished, assert on final sum
      expect(sum).to.be.lessThan(200000);
      cy.log(`Calculated sum: ${sum}`);
    });

    // locally override defaultCommandTimeout if needed
    Cypress.config('defaultCommandTimeout', 100000);

    // complete checkout flow
    cy.get('button.btn.btn-success').click();
    cy.get('#country').type('india');

    // wait for suggestions then click
    cy.get('div[class*="suggestions"] ul li a').click();

    // accept terms and submit
    cy.get('#checkbox2').click({ force: true });
    cy.get("input[type='submit']").click();

    // final success assertion
    cy.get('div[class*="alert alert-success alert-dismissible"] strong')
      .should('have.text', 'Success!');
  });
});
