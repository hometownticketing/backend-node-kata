import express from 'express';
import { getOrders } from '../util/storage-utility';

/**
 * Get a list of all orders from a specific customer
 * 
 * @method GET
 * @endpoint /customer/:customerName
 */
export const orderCustomerSearch = async (req: express.Request, res: express.Response) => {
    const {...params} = req.params;

    const orders = (await getOrders()).filter(o => o.customer === params.customerName);
    res.send(orders);

    return orders;
}