import express from 'express';
import { PaymentMethod } from '../order-utility';

/**
 * Create a mock express request to create an order
 * 
 * This is to be used for testing
 * 
 * @param customer 
 * @param product 
 * @param quantity 
 * @param paymentMethod 
 * @returns The mock request
 */
export const mockOrderReq = (customer, product, quantity = 100, paymentMethod = PaymentMethod.Credit) => {
    return {
        body: {
            customer: customer,
            product: product,
            quantity: quantity,
            paymentMethod: paymentMethod
        }
    } as express.Request;
}