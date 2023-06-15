import express from 'express';
import { stockUpdate } from './stock.update';
import { checkStock } from '../util/product-utility';

describe('Stock Update Route', () => {
    it('should update the stock to the correct value', async () => {
        const req = {
            body: {
                product: 'A',
                quantity: 200
            }
        } as express.Request;

        await stockUpdate(req);

        expect(checkStock('A')).resolves.toBe(200);
    });
});