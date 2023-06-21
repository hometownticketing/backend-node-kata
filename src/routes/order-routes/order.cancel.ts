import express from 'express';
import { OrderStatus } from '../../util/order-utility';
import { getOrders, setOrders } from '../../util/storage-utility';
import { StatusCodes } from 'http-status-codes';

/**
 * Attempt to cancel an order of a given orderId
 * 
 * @method PUT
 * @endpoint /cancelOrder
 * @returns True if the order was successfully canceled, otherwise, false.
 */
export const orderCancel = async (req: express.Request, res: express.Response): Promise<boolean> => {
    const {...params} = req.params;

    if(params.orderId === undefined) {
        res.sendStatus(StatusCodes.BAD_REQUEST);
        return false;
    }

    const orders = await getOrders();
    const order = orders.find(o => o.orderId == params.orderId);

    if(order === undefined) {
        res.sendStatus(StatusCodes.NOT_FOUND);
        return false;
    } else if(order.status == OrderStatus.Shipped) {
        res.status(405).send('Cannot cancel a shipped order');
        return false;
    }

    if(await setOrders(orders.filter(o => o.orderId != order.orderId))) {
        res.sendStatus(StatusCodes.NO_CONTENT);
        return true;
    } else {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Error updating order list');
        return false;
    }
}