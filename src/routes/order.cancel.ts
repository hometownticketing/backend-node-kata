import express from 'express';
import { getOrders, setOrders } from '../util/storage-utility';
import { OrderStatus } from '../util/order-utility';

/**
 * Attempt to cancel an order of a given orderId
 * 
 * @method PUT
 * @endpoint /cancelOrder
 * @returns True if the order was successfully canceled, otherwise, false.
 */
export const orderCancel = async (req: express.Request): Promise<boolean> => {
    const {...data} = req.body;

    const orders = await getOrders();
    const order = orders.find(o => o.orderId == data.orderId);
    if(order.status == OrderStatus.Shipped) {
        return false;
    }

    return await setOrders(orders.filter(o => o.orderId != order.orderId));
}