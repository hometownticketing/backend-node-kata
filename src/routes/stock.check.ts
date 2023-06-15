import express from 'express';
import { checkStock } from '../util/product-utility';

/**
 * Check the stock of a product
 * 
 * @method GET
 * @endpoint /stock/:product
 */
export const stockCheck = async (req: express.Request, res: express.Response) => {
    const {...params} = req.params;

    const productStock = await checkStock(params.product);

    const result = {
        product: params.product,
        stock: productStock
    };

    res.send(result)
    
    return result;
}