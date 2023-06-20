import express from 'express';
import { getOrder } from '../../util/order-utility';

/**
 * Find a specific order using its id
 *
 * @method GET
 * @endpoint /order/:orderId
 * @returns The order or undefined if it does not exist
 */
export const orderSearch = async (req: express.Request, res: express.Response) => {
    const {...params} = req.params;

    if(params.orderId === undefined) {
        res.sendStatus(400);
    }

    const order = await getOrder(params.orderId);

    if(order === undefined) {
        res.sendStatus(404);
        return undefined;
    }
    
    res.send(order);
    return order;
}