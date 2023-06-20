import express from 'express';
import { getOrder } from '../../util/order-utility';

/**
 * Find a specific order using its id
 *
 * @method GET
 * @endpoint /order/:orderId
 * @returns The order
 */
export const orderSearch = async (req: express.Request, res: express.Response) => {
    const {...params} = req.params;

    const order = await getOrder(parseInt(params.orderId));
    res.send(order);

    return order;
}