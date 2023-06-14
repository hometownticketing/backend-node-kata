// import express from 'express';
import { orderCreate } from './order.create';

describe('Order Create Route', () => {
    it('should create a new ticket and create it', () => {
        const req = {
            body: {
                id: 0,
                customer: 'Bill',
                productId: 67
            }
        }

        expect(orderCreate(req)).toEqual(true);


    });
})