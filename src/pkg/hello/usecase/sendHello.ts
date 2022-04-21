import { Request, Response } from 'express';

export const sendHello = (req: Request, resp: Response) => {
  return resp.send('Hello world');
};
