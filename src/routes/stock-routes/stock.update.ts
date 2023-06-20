import express from 'express';
import { getStock, setStock } from '../../util/storage-utility';

/**
 * Update the quantity of a product in the stock
 * 
 * @method PUT
 * @endpoint /updateStock
 * @returns True if the stock was successfully update, otherwise, false
 */
export const stockUpdate = async (req: express.Request) => {
    const {...params} = req.params;
    const {...data} = req.body;

    const stock = await getStock();
    stock.find(p => p.name === params.product).quantity = parseInt(data.quantity);
    return await setStock(stock);
}