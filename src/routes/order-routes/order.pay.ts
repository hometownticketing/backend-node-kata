import express from 'express';
import { updateStatus } from '../../util/order-utility';

/**
 * Notify the system that the payment for an order with a specific orderId has arrived.
 * 
 * @method PUT
 * @endpoint /providePayment
 * @returns The order that has been updated after receiving payment
 */
export const orderPay = async (req: express.Request) => {
    const {...params} = req.params;
    return await updateStatus(parseInt(params.orderId), true);
}