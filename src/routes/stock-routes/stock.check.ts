import express from 'express';
import { checkStock } from '../../util/product-utility';
import { StatusCodes } from 'http-status-codes';

/**
 * Check the stock of a product
 * 
 * @method GET
 * @endpoint /stock/:product
 * @returns A result object containing the product name and quantity or null if there was an issue checking the stock.
 */
export const stockCheck = async (req: express.Request, res: express.Response) => {
    const {...params} = req.params;

    if(params.product === undefined) {
        res.sendStatus(StatusCodes.BAD_REQUEST);
        return null;
    }

    const productStock = await checkStock(params.product);

    if(productStock === -1) {
        res.status(StatusCodes.NOT_FOUND).send('Product is not supported');
        return null;
    }
    
    const result = {
        product: params.product,
        stock: productStock
    };

    res.send(result);
    
    return result;
}