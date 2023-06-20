import express from 'express';
import { orderSearch } from './order.search';
import { mockResponse } from '../util/testing-util/mock-response';
import { PaymentMethod, createOrder, getOrder } from '../util/order-utility';

describe('Order Search Route', () => {
    it('should retrieve the correct order', async () => {
        
        const order1 = await createOrder('Gus', 'E', 54, PaymentMethod.Credit);

        const req = {
            params: {
                orderId: order1.orderId
            }
        } as unknown as express.Request;

        expect(orderSearch(req, mockResponse())).resolves.toStrictEqual(order1);

        const order2 = await createOrder('Evan', 'D', 122);

        req.params.orderId = order2.orderId;

        expect(orderSearch(req, mockResponse())).resolves.toStrictEqual(order2);
    });
});