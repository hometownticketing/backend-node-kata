import express from 'express';
import { createOrder } from '../util/order-utility';

/**
 * Create an order and store it
 * 
 * @method POST
 * @endpoint /placeOrder
 * @returns The order that has been created.
 */
export const orderCreate = async (req: express.Request) => {
    const {...data} = req.body;
    return await createOrder(data.customer, data.product, data.quantity, data.paymentMethod);
}
