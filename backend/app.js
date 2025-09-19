import express from 'express'
import cors from 'cors'
import "./Cron/scheduler.js";
import dotenv from 'dotenv';
import { registerRouter } from './routes/register.route.js'
import router from './routes/cron.route.js';
dotenv.config();

export const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());
app.use('/api',registerRouter);
app.use('/api',router);
