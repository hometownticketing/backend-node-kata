import express from 'express';
import { PaymentMethod, createOrder, getOrder } from '../util/order-utility';
import { orderCancel } from './order.cancel';

describe('Order Cancel Route', () => {
    it('should cancel an order that hasn\'t been shipped', async () => {
        const order = await createOrder('Henry', 'B', 15, PaymentMethod.Physical);

        const req = {
            body: {
                orderId: order.orderId
            }
        } as express.Request;

        await orderCancel(req);

        expect(getOrder(order.orderId)).resolves.toBeUndefined();
    });

    it('should not cancel an order that has already been shipped', async () => {
        const order = await createOrder('George', 'B', 15, PaymentMethod.Credit);

        const req = {
            body: {
                orderId: order.orderId
            }
        } as express.Request;

        await orderCancel(req);

        expect(getOrder(order.orderId)).resolves.toBeDefined();
    });
});