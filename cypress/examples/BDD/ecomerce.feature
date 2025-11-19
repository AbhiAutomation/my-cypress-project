Feature: Entd to end Ecomerce validation


Scenario: Ecomorce products delvery 

Given I am on EComercePage

When I log in to the application

And I add products to the cart and checkout 

And I validate the total prices limit 

Then  Select the counrty I submit the order and verify the Thankyou message
