import express from 'express';
import { getOrders } from '../util/storage-utility';

/**
 * Retrieve a list of orders with a given status
 * 
 * @method GET
 * @endpoint /orders/:orderStatus
 */
export const orderFilteredList = async (req: express.Request, res: express.Response) => {
    const {...params} = req.params;

    const orders = (await getOrders()).filter(o => o.status == params.orderStatus);

    res.send(orders);
    return orders;
}
