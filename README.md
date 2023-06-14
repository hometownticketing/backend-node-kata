# Order Processing Backend Kata
This Kata is adapted from the the [More Business Rules Kata](http://codekata.com/kata/kata17-more-business-rules/) from http://codekata.com/.

For this Kata, you will create a REST API for a business that processes orders and payments over the web.

Once an order is placed, the business will have to wait for the payment to arrive. Once the payment has arrived, the business will ship the goods if they are in stock, otherwise, they will wait until the goods are in stock before shipping.

If the order was a credit-card order, the business would not have to wait for the payment to arrive and would instead ship the goods as soon as they are in stock.

The customer is able to cancel the order at any time unless the order has already been shipped.

### **The API should be able to handle GET requests to:**
- Get a list of all orders (Can filter this to pending orders or shipped orders)
- Get an order of a specific ID
- Get the orders of a specific customer
- Get the stock of a good of a specific ID

### **The API should be able to handle POST requests to:**
- Place a new order
- Provide payment for an order of a specific ID
- Attempt to cancel an order
- Update the stock of a good of a specific ID
