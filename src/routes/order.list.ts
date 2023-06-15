import express from 'express';
import { getOrders } from '../util/storage-utility';

/**
 * Create an order
 * 
 * @method GET
 * @endpoint /orders
 */
export const orderList = async (req: express.Request, res: express.Response) => {
    const orders = await getOrders();
    res.send(orders);
    return orders;
}
