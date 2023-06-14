import { promises as fs } from 'fs';

const dataPath = "../../assets/dataStore.json";
const blankDataStore = {
    lastOrderId: 0,
    orders: {}
};

// WIP
export const createOrder = async (customer: string, productId: number, date: Date = new Date()) => {
    try {
        const rawData = await fs.readFile(dataPath, 'utf8');
        const data = JSON.parse(rawData);
    } catch (err) {
        initializeDataStore();

    }
}

async function initializeDataStore(): Promise<boolean> {
    try {
        await fs.writeFile(dataPath, JSON.stringify(blankDataStore));
        return true;
    } catch(err) {
        console.log('ERROR initializing data store!', err);
        return false;
    }
}