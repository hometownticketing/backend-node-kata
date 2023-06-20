import express from 'express';
import { stockUpdate } from './stock.update';
import { checkStock } from '../../util/product-utility';
import { mockResponse } from '../../util/testing-util/mock-response';

describe('Stock Update Route', () => {
    it('should update the stock to the correct value', async () => {
        const req = {
            params: {
                product: 'A'
            },
            body: {
                quantity: 200
            }
        } as unknown as express.Request;

        await stockUpdate(req, mockResponse());

        expect(checkStock('A')).resolves.toBe(200);
    });
});