import express from 'express';
import { orderSearch } from './order.search';
import { mockResponse } from '../util/testing-util/mock-response';
import { getOrder } from '../util/order-utility';

describe('Order Search Route', () => {
    it('should retrieve the correct order', async () => {
        const req = {
            params: {
                orderId: 1
            }
        } as unknown as express.Request;

        expect(orderSearch(req, mockResponse())).resolves.toStrictEqual(await getOrder(1));

        req.params.orderId = '' + 3;

        expect(orderSearch(req, mockResponse())).resolves.toStrictEqual(await getOrder(3));
    });
});