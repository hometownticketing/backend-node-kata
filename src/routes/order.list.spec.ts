import express from 'express';
import { getOrders } from '../util/storage-utility';
import { orderList } from './order.list';
import { mockResponse } from '../util/testing-util/mock-response';
import { OrderStatus } from '../util/order-utility';

describe('Order List Route', () => {
    it('Should respond with a list of all orders', async () => {
        const orders = await getOrders();

        expect(orderList({} as express.Request, mockResponse())).resolves.toStrictEqual(orders);
    });

    it('Should be able to filter orders with query parameters', async () => {
        const req = {
            query: {
                status: OrderStatus.AwaitingPayment
            }
        } as unknown as express.Request;
        
        let filtered = await orderList(req, mockResponse());
        filtered.forEach(o => {
            expect(o.status).toBe(OrderStatus.AwaitingPayment);
        });

        req.query = {
            customer: 'Bill'
        };

        filtered = await orderList(req, mockResponse());
        filtered.forEach(o => {
            expect(o.customer).toBe('Bill');
        });
        
        req.query = {
            product: 'A'
        };

        filtered = await orderList(req, mockResponse());
        filtered.forEach(o => {
            expect(o.product).toBe('A');
        });
    })
});