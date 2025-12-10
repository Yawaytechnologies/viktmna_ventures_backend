import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import connectDB from './src/config/db.js';

import investerRouter from './src/modules/invester/invester.router.js';
import startupRouter from './src/modules/startup/startup.router.js';
import contactRouter from './src/modules/contact/contact.router.js';



dotenv.config();
const app = express();

const PORT = process.env.PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan('dev'));
app.use(cookieParser());




app.use('/api/investers',  investerRouter);
app.use('/api/startups', startupRouter);
app.use('/api/contacts', contactRouter);




app.get('/', (req,res )=>{
    res.send('server is running');
})

connectDB();


const server = app.listen(PORT, async() => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`http://localhost:${PORT}`);
});

export default server;