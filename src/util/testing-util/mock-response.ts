import express from 'express';

/**
 * Create a mock express response object that can be used for testing endpoints in JEST.
 * 
 * This mock response object will not do anything.
 * 
 * @returns {express.Response} The mocked response object
 * 
 */
export const mockResponse = () => {
    const res = {
        status: () => res,
        json: () => res,
        send: () => res,
        sendStatus: () => res
    };

    return res as unknown as express.Response;
}