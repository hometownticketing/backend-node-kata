import express from 'express';
import { OrderStatus } from '../../util/order-utility';
import { getOrders, setOrders } from '../../util/storage-utility';

/**
 * Attempt to cancel an order of a given orderId
 * 
 * @method PUT
 * @endpoint /cancelOrder
 * @returns True if the order was successfully canceled, otherwise, false.
 */
export const orderCancel = async (req: express.Request): Promise<boolean> => {
    const {...params} = req.params;

    const orders = await getOrders();
    const order = orders.find(o => o.orderId == params.orderId);
    if(order.status == OrderStatus.Shipped) {
        return false;
    }

    return await setOrders(orders.filter(o => o.orderId != order.orderId));
}