import { OrderStatus, updateStatus } from "./order-utility";
import { getOrders, getStock, setStock } from "./storage-utility"

/**
 * Get the current stock of a product
 * 
 * @param productName The name of the product
 * @returns The current stock of the product or -1 if the product is not supported
 */
export const checkStock = async (productName: string): Promise<number> => {
    const stock = await getStock();

    const product = stock.find(e => e.name === productName);

    if(product === undefined) {
        return -1;
    }

    return product.quantity;
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

    
    const orders = await getOrders();
    for(const order of orders) {
        if(order.product === productName && order.status === OrderStatus.AwaitingStock) {
            await updateStatus(order.orderId);
        }
    }
}