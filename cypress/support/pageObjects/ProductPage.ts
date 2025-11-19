import CartPage from './CartPage.js'
class productPage {


    pageValidation() {
        cy.wait(3000);  
        cy.url().should('include', 'shop')
      }
    verifyCardLimit() {
          cy.get("app-card").should('have.length', 4)}
        
    goToCart() {
        cy.contains('a', 'Checkout').click()
         return new CartPage();
    }

    selectFirstProduct() {
        cy.get('app-card').eq(0).contains('Add').click()
    }
    selectProduct(productName:string) {
        cy.get("app-card").filter(':contains("' + productName + '")').then($el => {
            cy.wrap($el).should('contain.text', productName)
            cy.wrap($el).contains('button', 'Add').click()
            
        })      
    }



          
            

    
} export default productPage
