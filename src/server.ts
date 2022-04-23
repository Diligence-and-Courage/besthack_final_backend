import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';

import { api } from './api';
import corsMiddleware from './middlewares/cors';
import newsHandler from './pkg/news';
import userHandler from './pkg/user';

dotenv.config();
const PORT = process.env.PORT || 3000;

const server = express();

server.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'combined'));
server.use(corsMiddleware);
server.use(bodyParser.json());
server.use(cookieParser());

const {
  user: { prefix: userPrefix },
  news: { prefix: newsPrefix },
} = api;

server.use(userPrefix, userHandler);
server.use(newsPrefix, newsHandler);

server.listen(PORT);
console.log(`Server listening on port ${PORT}`);
