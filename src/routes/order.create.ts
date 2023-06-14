import express from 'express';

export const orderCreate = (req: express.Request) => {
    const {...data} = req.body;
    console.log(data)

     
}
