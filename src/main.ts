import express from 'express';

import { orderCreate } from './routes/order.create';
import { orderList } from './routes/order.list';
import { orderFilteredList } from './routes/order.list.filtered';
import { orderSearch } from './routes/order.search';
import { orderCustomerSearch } from './routes/order.customer.search';
import { stockCheck } from './routes/stock.check';
import { orderPay } from './routes/order.pay';
import { orderCancel } from './routes/order.cancel';
import { stockUpdate } from './routes/stock.update';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/orders', orderList);

app.get('/orders/:orderStatus', orderFilteredList);

app.get('/order/:orderId', orderSearch);

app.get('/customer/:customerName', orderCustomerSearch);

app.get('/stock/:product', stockCheck);

app.put('/providePayment', orderPay);

app.put('/cancelOrder', orderCancel);

app.put('/updateStock', stockUpdate);

app.post('/placeOrder', orderCreate);

const server = app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});