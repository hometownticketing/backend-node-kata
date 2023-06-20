import express from 'express';
import { createOrder } from '../../util/order-utility';

/**
 * Create an order and store it
 * 
 * @method POST
 * @endpoint /placeOrder
 * @returns The order that has been created or null if the creation failed.
 */
export const orderCreate = async (req: express.Request, res: express.Response) => {
    const {...data} = req.body;
    if(data.customer !== undefined && data.product !== undefined && data.quantity !== undefined && data.paymentMethod !== undefined) {
        const newOrder = await createOrder(data.customer, data.product, data.quantity, data.paymentMethod);
        if(newOrder !== null) {
            res.sendStatus(200);
            return newOrder;
        } else {
            res.sendStatus(500);
            return null;
        }
    } else {
        res.sendStatus(400)
        return null;
    }
}
