import express from 'express';
import { orderCustomerSearch } from './order.customer.search';
import { mockResponse } from '../util/testing-util/mock-response';

describe('Order Customer Search Route', () => {
    it('should only retrieve orders with a certain customer name', async () => {
        const req = {
            params: {
                customerName: 'Billy'
            }
        } as unknown as express.Request;

        const orderResponse = await orderCustomerSearch(req, mockResponse());
        orderResponse.forEach(o => {
            expect(o.customer).toBe('Billy');
        });
    })
});