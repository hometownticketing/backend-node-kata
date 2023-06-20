import express from 'express';
import { getStock, setStock } from '../../util/storage-utility';
import { StatusCodes } from 'http-status-codes';

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
        res.sendStatus(StatusCodes.BAD_REQUEST);
        return false;
    }

    const stock = await getStock();
    const product = stock.find(p => p.name === params.product);

    if(product === undefined) {
        res.status(StatusCodes.NOT_FOUND).send('Product is not supported');
        return false;
    }
    
    try {
        product.quantity = parseInt(data.quantity);
    } catch(err) {
        res.status(StatusCodes.BAD_REQUEST).send('Invalid Quantity');
        return false;
    }

    if(await setStock(stock)) {
        res.sendStatus(StatusCodes.NO_CONTENT);
        return true;
    } else {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send('Error updating stock');
        return false;
    }
}