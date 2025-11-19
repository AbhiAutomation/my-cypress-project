/// <reference types="cypress" />
// Cleaned-up Cypress test file with robust, retryable assertions.
// Focus: make assertions reliable, readable and less brittle.

// Notes / best-practices used here:
// 1. Prefer `should()` for retryable assertions.
// 2. Use `.invoke('text')` + `.then()` or `.should('contain.text')` for text checks when trimming/case could matter.
// 3. Scope with `.within()` or `.find()` to avoid global collisions.
// 4. Use `cy.wrap()` inside `.each()` to keep Cypress chains and allow further commands/assertions.
// 5. Check presence/visibility before typing or clicking.

describe('My First Test - Robust Assertions', () => {

  it('verifies QA Automation Labs title', () => {
    cy.visit('https://qaautomationlabs.com/')

    // Retryable title check. Use contain for looser match; switch to eq for exact.
    cy.title().should('include', 'QA Automation Labs')

    // Example: stronger exact check (uncomment if you want exact match)
    // cy.title().should('eq', 'Home - QA Automation Labs')
  })

  it('verifies Rahul Shetty GreenKart flows with robust assertions', () => {
    cy.visit('https://rahulshettyacademy.com/seleniumPractise/#/')

    // Wait for title to include expected text (retryable)
    cy.title().should('include', 'GreenKart')

    // Ensure search input exists, is visible, and unique before typing
    cy.get('.search-keyword')
      .should('have.length', 1)
      .and('be.visible')
      .as('searchInput')

    // Type into the input once we know it is visible & unique
    cy.get('@searchInput').clear().type('ca')

    // Assert products filtered: check that visible product elements are >= 1 and expected count
    cy.get('.product:visible')
      .should('have.length.greaterThan', 0) // at least one visible after search

    // Scope to the products container for clearer assertions and reuse
    cy.get('.products')
      .should('exist')
      .as('productLocator')

    // Assert there are exactly 4 product elements inside container (visible or total depending on intent)
    cy.get('@productLocator').find('.product')
      .should('have.length', 4)

    // Iterate and click the product that contains 'Cashews' (use invoke('text') to keep it robust)
    cy.get('@productLocator').find('.product').each(($el) => {
      // wrap jQuery element to use Cypress commands
      cy.wrap($el).find('h4.product-name').invoke('text').then((text) => {
        const normalized = text.trim()
        if (normalized.includes('Cashews')) {
          // Ensure the Add to Cart button is visible and enabled before clicking
          cy.wrap($el).find('button').should('be.visible').and('not.be.disabled').click()

          // After clicking, assert cart or UI updates. Replace selector with actual cart-count selector if present.
          // Example assertion (uncomment if the site has a cart badge):
          // cy.get('.cart-count').should('contain', '1')
        }
      })
    })

    // Brand text: use invoke('text') and trimming for precise check, or use contain.text for forgiving check
    cy.get('.brand').should('be.visible')
    cy.get('.brand').invoke('text').then((t) => {
      expect(t.trim()).to.equal('GREENKART')
    })

    // Alternatively, a case-insensitive/flexible check:
    // cy.get('.brand').should('contain.text', 'GREENKART')

  })

})
