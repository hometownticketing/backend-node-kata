import express from 'express';

import { orderCancel } from './routes/order-routes/order.cancel';
import { orderCreate } from './routes/order-routes/order.create';
import { orderList } from './routes/order-routes/order.list';
import { orderPay } from './routes/order-routes/order.pay';
import { orderSearch } from './routes/order-routes/order.search';
import { stockCheck } from './routes/stock-routes/stock.check';
import { stockUpdate } from './routes/stock-routes/stock.update';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const port = 3000;

// Order operations
app.get('/orders', orderList);

app.post('/orders', orderCreate);

app.get('/orders/:orderId', orderSearch);

app.delete('/orders/:orderId', orderCancel);

app.put('/orders/:orderId/pay', orderPay);

// Stock Operations
app.get('/stock/:product', stockCheck);

app.put('/stock/:product', stockUpdate);


const server = app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});