import express from 'express';

import { OrderStatus, PaymentMethod } from '../../util/order-utility';
import { orderCreate } from './order.create';
import { checkStock } from '../../util/product-utility';
import { wipeDataStore } from '../../util/storage-utility';
import { mockResponse } from '../../util/testing-util/mock-response';
import { mockOrderReq } from '../../util/testing-util/mock-data';

beforeAll(wipeDataStore);

describe('Order Create Route', () => {
    it('should create a new order with the correct values and store it', async () => {
        const orderRes = await orderCreate(mockOrderReq('Bill', 'C', 105), mockResponse());

        expect(orderRes).not.toBeNull();
        expect(orderRes.customer).toBe('Bill');
        expect(orderRes.orderId).toBe(1);

    });

    it('should move a credit order directly to awaitingStock', async () => {
        const orderRes = await orderCreate(mockOrderReq('Bob', 'C', 105), mockResponse());

        expect(orderRes.status).toBe(OrderStatus.AwaitingStock);
    });

    it('an order with physical payment should have a status of awaitingPayment', async () => {
        const orderRes = await orderCreate(mockOrderReq('Billy', 'C', 35, PaymentMethod.Physical), mockResponse());

        expect(orderRes.status).toBe(OrderStatus.AwaitingPayment);
    });

    it('should ship a product if there is enough stock and decrease stock after', async () => {
        const orderRes = await orderCreate(mockOrderReq('BillBob', 'C', 35), mockResponse());

        expect(orderRes.status).toBe(OrderStatus.Shipped);
        expect(checkStock('C')).resolves.toBe(65);
    });
});