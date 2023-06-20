import express from 'express';
import { updateStatus } from '../../util/order-utility';

/**
 * Notify the system that the payment for an order with a specific orderId has arrived.
 * 
 * @method PUT
 * @endpoint /providePayment
 * @returns The order that has been updated after receiving payment or null if there is an invalid orderId
 */
export const orderPay = async (req: express.Request, res: express.Response) => {
    const {...params} = req.params;

    if(params.orderId === undefined) {
        res.sendStatus(400);
        return null;
    }

    const updatedOrder = await updateStatus(params.orderId, true);
    if(updatedOrder === null) {
        res.sendStatus(400);
        return null;
    } else {
        res.sendStatus(200);
        return updatedOrder;
    }
}