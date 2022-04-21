import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import express from 'express';
import morgan from 'morgan';

import { api } from './api';
import corsMiddleware from './middlewares/cors';
import helloHandler from './pkg/hello';
import userHandler from './pkg/user';

dotenv.config();
const PORT = process.env.PORT || 3000;

const server = express();

server.use(morgan(process.env.NODE_ENV === 'development' ? 'dev' : 'combined'));
server.use(corsMiddleware);
server.use(bodyParser.json());
server.use(cookieParser());

const {
  hello: { prefix: helloPrefix },
  user: { prefix: userPrefix },
} = api;

server.use(helloPrefix, helloHandler);
server.use(userPrefix, userHandler);

server.listen(PORT);
console.log(`Server listening on port ${PORT}`);
