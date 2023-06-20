import { getOrders, setOrders, getNextOrderId } from "./storage-utility";
import { checkStock, updateStock } from "./product-utility";

/**
 * Create a new order and add it to the dataStore
 * 
 * @param customer The name of the customer that created the order
 * @param product The name of the product that was ordered
 * @param quantity The quantity that was ordered
 * @param paymentMethod The payment method (defaults to PaymentMethod.Credit)
 * @param date The date that the order was placed (defaults to the current date)
 * 
 * @returns The order that has been created.
 */
export const createOrder = async (customer: string, product: string, quantity: number, paymentMethod: number = PaymentMethod.Credit, date: Date = new Date()) => {
    const orderId = await getNextOrderId();
    const newOrder = {
        orderId: orderId,
        customer: customer,
        date: date,
        product: product,
        quantity: quantity,
        paymentMethod: paymentMethod,
        status: (paymentMethod === PaymentMethod.Credit)? OrderStatus.AwaitingStock : OrderStatus.AwaitingPayment
    }

    const orders = await getOrders();
    orders.push(newOrder);

    await setOrders(orders);

    return await updateStatus(newOrder.orderId);
}

/**
 * Update the status of an order and save it to the dataStore
 * 
 * @param orderId The id of the order
 * @param paymentArrived Whether the payment for the order has arrived (false by default)
 * 
 * @returns The updated order
 */
export const updateStatus = async (orderId: number, paymentArrived = false) => {
    const orders = await getOrders();
    const orderIdx = orders.findIndex(o => o.orderId === orderId);
    const order = orders[orderIdx];

    if(order === undefined || order.status === OrderStatus.Shipped) {
        return order;
    }
    
    if(order.status === OrderStatus.AwaitingPayment) {
        if(paymentArrived) {
            order.status = OrderStatus.AwaitingStock;
        } else {
            return order;
        }
    }
    if(order.status === OrderStatus.AwaitingStock) {
        const productStock = await checkStock(order.product);
        if(productStock >= order.quantity) {
            order.status = OrderStatus.Shipped;
            await updateStock(order.product, productStock - order.quantity);
        }
    }

    orders[orderIdx] = order;
    await setOrders(orders);
    return order;
}

/**
 * Retrieve an order of a given ID from the dataStore
 * 
 * @param orderId The ID of the order to retrieve
 * @returns The order
 */
export const getOrder = async (orderId: number) => {
    const orders = await getOrders();
    return orders.find(o => o.orderId === orderId);
}

export const PaymentMethod = {
    Physical: 0,
    Credit: 1
}

export const OrderStatus = {
    AwaitingPayment: 0,
    AwaitingStock: 1,
    Shipped: 2
}