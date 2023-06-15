import express from 'express';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const port = 3000;

app.get('/', (req, res) => {
    res.send('Hello World!');
});

const server = app.listen(port, () => {
    return console.log(`Express is listening at http://localhost:${port}`);
});