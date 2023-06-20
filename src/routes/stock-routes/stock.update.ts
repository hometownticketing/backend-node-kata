import express from 'express';
import { getStock, setStock } from '../../util/storage-utility';

/**
 * Update the quantity of a product in the stock
 * 
 * @method PUT
 * @endpoint /updateStock
 * @returns True if the stock was successfully update, otherwise, false
 */
export const stockUpdate = async (req: express.Request, res: express.Response) => {
    const {...params} = req.params;
    const {...data} = req.body;

    if(params.product === undefined || data.quantity === undefined) {
        res.sendStatus(400);
        return false;
    }

    const stock = await getStock();
    const product = stock.find(p => p.name === params.product);

    if(product === undefined) {
        res.status(404).send('Product is not supported');
        return false;
    }
    
    try {
        product.quantity = parseInt(data.quantity);
    } catch(err) {
        res.status(400).send('Invalid Quantity');
        return false;
    }

    if(await setStock(stock)) {
        res.sendStatus(200);
        return true;
    } else {
        res.sendStatus(500);
        return false;
    }
}