import type { RequestHandler } from 'express';
import type { ValidationChain } from 'express-validator';

export type Path = {
  url: string;
  method: 'get' | 'post' | 'put' | 'delete';
  middlewares: (RequestHandler | ValidationChain[])[];
  handler: RequestHandler;
};

export type Route = {
  prefix: string;
  paths: Path[];
};

export type Api = Record<'hello' | 'user', Route>;
