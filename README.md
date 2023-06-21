# Order Processing Backend Kata
This Kata is adapted from the [More Business Rules Kata](http://codekata.com/kata/kata17-more-business-rules/) from http://codekata.com/.

For this Kata, you will create a REST API using Node.js and Express.js for a business that processes orders and payments over the web. The business produces products **A**, **B**, **C**, **D**, and **E**. Assume that the business starts with a stock of 100 units of each product.

Once an order is placed, the business will have to wait for the payment to arrive. Once the payment has arrived, the business will ship the goods if they are in stock, otherwise, they will wait until the goods are in stock before shipping.

If the order was a credit-card order, the business would not have to wait for the payment to arrive and would instead ship the goods as soon as they are in stock.

The customer is able to cancel the order at any time unless the order has already been shipped.

You are provided with the *storage-utility*, *product-utility*, and *order-utility* modules for storing and handling product and order information.

The *mock-response* module can, but does not have to, be used in writing tests.

## **Setup**
- Download and run the [Node.js Installer](https://nodejs.dev/en/download/)
- [Install](https://git-scm.com/downloads) Git and follow the [Setup Guide](https://git-scm.com/book/en/v2/Getting-Started-First-Time-Git-Setup)
- Create a new branch from main on this repository and name it in the format "**Firstname-Lastname**"
- Clone your branch of this repository to your device ([tutorial](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository))
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

#### The API should handle the following order operations:
| Endpoint                    | Method | Description                                                                           |
| ---                         | ---    | ---                                                                                   |
| /orders                     | GET    | Get a list of all orders. This should handle filtering using query parameters.        |
| /orders                     | POST   | Place a new order.                                                                    |
| /orders/:orderId            | GET    | Get an order of a specific ID.                                                        |
| /orders/:orderId            | DELETE | Attempt to cancel an order (The order can only be canceled if it hasn't been shipped) |
| /orders/:orderId/pay        | PUT    | Notify the system that the payment for an order with a specific ID has arrived.       |

#### The API should handle the following stock operations:
| Endpoint        | Method | Description                         |
| ---             | ---    | ---                                 |
| /stock/:product | GET    | Get the current stock of a product. |
| /stock/:product | PUT    | Update the stock of a product.      |
