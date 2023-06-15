import express from 'express';

export const mockResponse = () => {
    const res = {
        status: () => res,
        json: () => res,
        send: () => res
    };

    return res as unknown as express.Response;
}