import express from 'express';

import { OrderStatus, PaymentMethod } from '../../util/order-utility';
import { orderCreate } from './order.create';
import { checkStock } from '../../util/product-utility';
import { wipeDataStore } from '../../util/storage-utility';

beforeAll(wipeDataStore);

describe('Order Create Route', () => {
    it('should create a new order with the correct values and store it', async () => {
        const req = {
            body: {
                customer: 'Bill',
                product: 'C',
                quantity: 105,
                paymentMethod: PaymentMethod.Credit
            }
        } as express.Request

        const orderRes = await orderCreate(req);

        expect(orderRes).not.toBeNull();
        expect(orderRes.customer).toBe('Bill');
        expect(orderRes.orderId).toBe(1);

    });

    it('should move a credit order directly to awaitingStock', async () => {
        const req = {
            body: {
                customer: 'Bob',
                product: 'C',
                quantity: 105,
                paymentMethod: PaymentMethod.Credit
            }
        } as express.Request

        const orderRes = await orderCreate(req);

        expect(orderRes.status).toBe(OrderStatus.AwaitingStock);
    });

    it('an order with physical payment should have a status of awaitingPayment', async () => {
        const req = {
            body: {
                customer: 'Billy',
                product: 'C',
                quantity: 35,
                paymentMethod: PaymentMethod.Physical
            }
        } as express.Request

        const orderRes = await orderCreate(req);

        expect(orderRes.status).toBe(OrderStatus.AwaitingPayment);
    });

    it('should ship a product if there is enough stock and decrease stock after', async () => {
        const req = {
            body: {
                customer: 'BillBob',
                product: 'C',
                quantity: 35,
                paymentMethod: PaymentMethod.Credit
            }
        } as express.Request

        const orderRes = await orderCreate(req);

        expect(orderRes.status).toBe(OrderStatus.Shipped);
        expect(checkStock('C')).resolves.toBe(65);
    });
});