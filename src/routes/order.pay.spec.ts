import express from 'express';
import { OrderStatus, PaymentMethod, createOrder, getOrder } from '../util/order-utility';
import { orderPay } from './order.pay';

describe('Order Pay Route', () => {
    it('should change the status of an order that needs stock to OrderStatus.AwaitingStock', async () => {
        const order = await createOrder('Fred', 'A', 1000, PaymentMethod.Physical);

        const req = {
            body: {
                orderId: order.orderId
            }
        } as express.Request;

        await orderPay(req);

        expect((await getOrder(order.orderId)).status).toBe(OrderStatus.AwaitingStock);
    });

    it('should change the status of an order that doesn\'t need stock to OrderStatus.Shipped', async () => {
        const order = await createOrder('Hank', 'A', 10, PaymentMethod.Physical);

        const req = {
            body: {
                orderId: order.orderId
            }
        } as express.Request;

        await orderPay(req);

        expect((await getOrder(order.orderId)).status).toBe(OrderStatus.Shipped);
    });
});