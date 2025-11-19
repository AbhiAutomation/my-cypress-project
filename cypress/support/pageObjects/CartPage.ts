import ConfirmationPage from './ConfirmationPage';
class CartPage{

    checkoutItems() {
        cy.contains('button', 'Checkout').click()
        return new ConfirmationPage();
    }   
verifyTotalAmount() {
  let sum = 0;

cy.get('tr td:nth-child(4) strong')
  .each(($el) => {
    const amount = $el.text();            // e.g. "₹ 5000"
    const res = amount.split(" ")[1].trim();  // extract the number
    const value = Number(res);

    sum += value;
    cy.log(`Running total: ${sum}`);
  })
  .then(() => {
    cy.log(`Final Sum = ${sum}`);
    expect(sum).to.be.lessThan(200000);
  });

    }
}
export default CartPage;