import express from 'express';
import { getOrders } from '../util/storage-utility';
import { mockResponse } from '../util/testing-util/mock-response';
import { OrderStatus } from '../util/order-utility';
import { orderFilteredList } from './order.list.filtered';

describe('Order Filtered List Route', () => {
    it('Should respond with a list of filtered orders', async () => {
        const orders = await getOrders();

        const req = {
            params: {
                orderStatus: OrderStatus.AwaitingPayment
            }
        } as unknown as express.Request;
        
        let filtered = await orderFilteredList(req, mockResponse());
        filtered.forEach(o => {
            expect(o.status).toBe(OrderStatus.AwaitingPayment);
        });

        req.params.orderStatus = '' + OrderStatus.AwaitingStock;

        filtered = await orderFilteredList(req, mockResponse());
        filtered.forEach(o => {
            expect(o.status).toBe(OrderStatus.AwaitingStock);
        });
        
        req.params.orderStatus = '' + OrderStatus.Shipped

        filtered = await orderFilteredList(req, mockResponse());
        filtered.forEach(o => {
            expect(o.status).toBe(OrderStatus.Shipped);
        });
    });
});