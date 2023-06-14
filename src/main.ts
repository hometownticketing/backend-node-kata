import express from 'express';
import { orderCreate } from './routes/order.create';

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/orders', orderCreate);

const server = app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});