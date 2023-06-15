import { promises as fs } from 'fs';

// The location that the dataStore will be stored
const dataPath = "./assets/dataStore.json";

// This object will be used to initialize the dataStore when none is found.
const dataStoreSkeleton = {
    lastOrderId: 0,
    orders: [],
    stock: [
        {
            name: 'A',
            quantity: 100
        },
        {
            name: 'B',
            quantity: 100
        },
        {
            name: 'C',
            quantity: 100
        },
        {
            name: 'D',
            quantity: 100
        },
        {
            name: 'E',
            quantity: 100
        },
        
    ]
}
/**
 * Retrieve the list of orders from the dataStore
 * 
 * @returns a list of order objects
 */
export const getOrders = async () => {
    const dataStore = await fetchDataStore();
    return dataStore.orders;
}

/**
 * Save an updated list of orders to the dataStore
 * 
 * @param newOrders The updated list
 * @returns True if the update was successful, otherwise, false.
 */
export const setOrders = async (newOrders): Promise<boolean> => {
    const dataStore = await fetchDataStore();
    dataStore.orders = newOrders;

    return await saveDataStore(dataStore);
}

/**
 * Retrieve the stock from the dataStore
 * <p>
 * The stock is a list of product objects
 * 
 * @returns A list of product objects
 */
export const getStock = async () => {
    const dataStore = await fetchDataStore();
    return dataStore.stock;
}

/**
 * Save an updated stock to the dataStore
 * <p>
 * The stock is a list of product objects
 * 
 * @param newStock The updated stock list
 * @returns True if the update was successful, otherwise, false.
 */
export const setStock = async (newStock): Promise<boolean> => {
    const dataStore = await fetchDataStore();
    dataStore.stock = newStock;
    
    return await saveDataStore(dataStore);
}

/**
 * Get the orderId to be used for the next order.
 * <p>
 * This also updates the lastOrderId number in the dataStore.
 * 
 * @returns The next orderId to be used.
 */
export const getNextOrderId = async (): Promise<number> => {
    const dataStore = await fetchDataStore();
    dataStore.lastOrderId++;

    await saveDataStore(dataStore);
    return dataStore.lastOrderId;
}

/**
 * Wipe the dataStore
 * <p>
 * This will mainly be used for testing.
 * 
 * @returns True if the data was successfully wiped, otherwise, false.
 */
export const wipeDataStore = async (): Promise<boolean> => {
    try {
        await fs.unlink(dataPath);
        return true;
    } catch(err) {
        console.log('ERROR wiping data store!', err);
        return false;
    }
}

/**
 * Retrieve the dataStore from the location, "dataPath"
 * 
 * @returns The dataStore as an object
 */
async function fetchDataStore() {
    try {
        const rawData = await fs.readFile(dataPath, 'utf8');
        return JSON.parse(rawData);
    } catch (err) {
        return await initializeDataStore();
    }
}

/**
 * Overwrite the old dataStore with a new updated one
 * 
 * @param newDataStore The updated dataStore
 * @returns True if the update was successful, otherwise, false.
 */
async function saveDataStore(newDataStore: object): Promise<boolean> {
    try {
        await fs.writeFile(dataPath, JSON.stringify(newDataStore));
        return true;
    } catch (err) {
        console.log('ERROR saving data store!', err);
        return false;
    }
}

/**
 * Initialize the dataStore at the location specified by dataPath.
 * 
 * @returns The empty dataStore that has been initialized or null if the initialization failed.
 */
async function initializeDataStore() {
    try {
        await fs.writeFile(dataPath, JSON.stringify(dataStoreSkeleton));
        return dataStoreSkeleton;
    } catch(err) {
        console.log('ERROR initializing data store!', err);
        return null;
    }
}
