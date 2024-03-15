'use strict'
import express from "express";
import route from '@/router';

const app = express();
const port = 8021;

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(route)
app.listen(port, () => {
    console.log('------------ new request -----------------');
    console.log(`server is running at: http://localhost:${port}`);
})