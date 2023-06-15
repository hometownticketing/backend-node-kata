import express from 'express';
import { getOrders } from '../util/storage-utility';
import { orderList } from './order.list';
import { mockResponse } from '../util/testing-util/mock-response';

describe('Order List Route', () => {
    it('Should respond with a list of all orders', async () => {
        const orders = await getOrders();

        expect(orderList({} as express.Request, mockResponse())).resolves.toStrictEqual(orders);
    });
});