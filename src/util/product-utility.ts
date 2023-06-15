import { getStock, setStock } from "./storage-utility"

/**
 * Get the current stock of a product
 * 
 * @param productName The name of the product
 * @returns The current stock of the product
 */
export const checkStock = async (productName: string): Promise<number> => {
    const stock = await getStock();
    return stock.find(e => e.name === productName).quantity;
}

/**
 * Update the stock of a product
 * 
 * @param productName The name of the product to update
 * @param newQuantity The new quantity of the product that is in stock
 */
export const updateStock = async (productName: string, newQuantity: number) => {
    if(newQuantity < 0) {
        return;
    }

    const stock = await getStock();

    const prodIdx = stock.findIndex(e => e.name === productName);
    stock[prodIdx].quantity = newQuantity;

    await setStock(stock);
}