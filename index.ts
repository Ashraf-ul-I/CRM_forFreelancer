import express from 'express'
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from './generated/prisma';
import authRoutes from './routes/authRoutes.routes'; 
import clientRoutes from './routes/client.routes'
import projectRoutes from './routes/project.routes'
import interactionLogRoutes from './routes/interactionLogs.routes'
import { errorHandler } from './middlewares/errorHandler';
import cookieParser from 'cookie-parser';


dotenv.config();
const app=express();
const prisma=new PrismaClient();
 
app.use(cookieParser());
app.use(cors());
app.use(express.json());

app.use('/api/auth',authRoutes);
app.use('/api/user',clientRoutes);
app.use('/api/project',projectRoutes);
app.use('/api/interaction-logs',interactionLogRoutes);

app.use(errorHandler);

const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server is Running on ${PORT}`)
})
