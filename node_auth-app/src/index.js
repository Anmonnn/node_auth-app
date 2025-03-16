'use strict';
import express from 'express';
import 'dotenv/config.js';
import { authRouter } from './routes/auth.route.js';
import cors from 'cors';
import { userRouter } from './routes/user.route.js';
import { errorMiddleware } from './middleware/errorMiddleware.js';
import cookieParser from 'cookie-parser'
//npm i jsonwebtoken
//npm i bcrypt
//npm i 'cookie-parser'

const PORT = process.env.PORT || 3005;

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: process.env.CLIENT_HOST,
  credentials: true,
}))

app.use(authRouter);
app.use('/users' , userRouter);

app.get('/', (req, res) => {
  res.send('hello');
});

app.use(errorMiddleware)

app.listen(PORT, () => {
  console.log('Server is running');
});
