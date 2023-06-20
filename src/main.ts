import express from 'express';

import { orderList } from './routes/order.list';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const port = 3000;

// Order operations
app.get('/orders', orderList);

const server = app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});