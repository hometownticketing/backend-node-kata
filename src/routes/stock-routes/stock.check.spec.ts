import express from 'express';
import { stockCheck } from './stock.check';
import { mockResponse } from '../../util/testing-util/mock-response';
import { checkStock } from '../../util/product-utility';

describe('Stock Check Route', () => {
    it('should return the correct stock for a product', async () => {
        const req = {
            params: {
                product: 'C'
            }
        } as unknown as express.Request;

        const resultObject = await stockCheck(req, mockResponse());

        expect(resultObject.stock).toBe(await checkStock('C'));

    })
})