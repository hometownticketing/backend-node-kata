import express from 'express';
import { getOrders } from '../util/storage-utility';

/**
 * Create an order
 * 
 * This handles filtering using query parameters
 * 
 * @method GET
 * @endpoint /orders
 * @returns A list of all orders
 */
export const orderList = async (req: express.Request, res: express.Response) => {
    const filters = req.query;

    const orders = await getOrders();
    const filteredOrders = orders.filter(order => {

        for(const key in filters) {
            if(order[key] != filters[key]) {
                return false;
            }
        }
        
        return true;
    });

    res.send(filteredOrders);
    return filteredOrders;
}
