import productPage from "./ProductPage"

class HomePage {


    goTo(url:string) {
        cy.visit(url)
    }

    login(username:string, password:string) {
       
        cy.get("#username").type(username)
        cy.get("#password").type(password)
        cy.get("#signInBtn").click()
       return new productPage();
    }
} export default HomePage
 