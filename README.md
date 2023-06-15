# Order Processing Backend Kata
This Kata is adapted from the the [More Business Rules Kata](http://codekata.com/kata/kata17-more-business-rules/) from http://codekata.com/.

For this Kata, you will create a REST API using Node.js and Express.js for a business that processes orders and payments over the web. The business produces products **A**, **B**, **C**, **D**, and **E**. Assume that the business starts with a stock of 100 units of each product.

Once an order is placed, the business will have to wait for the payment to arrive. Once the payment has arrived, the business will ship the goods if they are in stock, otherwise, they will wait until the goods are in stock before shipping.

If the order was a credit-card order, the business would not have to wait for the payment to arrive and would instead ship the goods as soon as they are in stock.

The customer is able to cancel the order at any time unless the order has already been shipped.

Store the orders, stock, and any other necessary information by creating JSON or CSV files in the assets folder.

## **Setup**
- Download and run the [Node.js Installer](https://nodejs.dev/en/download/)
- [Install](https://git-scm.com/downloads) Git and follow the [Setup Guide](https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup)
- Clone the main branch of this repository to your device ([tutorial](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository))
- Open the terminal in the root directory of this Kata
- Run the command, `npm install`

## **Requirements**
<hr>

### Each order should have: 
- A unique ID (assigned by the server)
- A customer name
- The date it was placed
- The product that was ordered
- The quantity of the product ordered
- The payment method (either **Physical** or **Credit**)
- Its current status (assigned **AwaitingPayment**, **AwaitingStock**, or **Shipped** by the server)

Create tests using **Jest** as needed. The testing file for "*program.ts*" would be named "*program.spec.ts*"

### **Endpoints**

<hr>
<br>

#### The API should be able to handle GET requests to:
| Endpoint | Description |
| --- | --- |
| /orders | Get a list of all orders with the ability to filter to only pending or shipped orders. |
| /order/:orderId | Get an order of a specific ID. |
| /cutomer/:customerName | Get the orders of a specific customer. |
| /stock/:product | Get the current stock of a product. |

<hr>
<br>

#### The API should be able to handle POST requests to:
| Endpoint | Description |
| ---      | ---         |
| /placeOrder | Place a new order. |

<hr>
<br>

#### The API should be able to handle PUT requests to:
| Endpoint | Description |
| --- | --- |
| /providePayment | Notify the system that the payment for an order with a specific ID has arrived.
| /cancelOrder |Attempt to cancel an order (The order can only be canceled if it hasn't been shipped) |.
| /updateStock | Update the stock of a product of a specific ID. |
