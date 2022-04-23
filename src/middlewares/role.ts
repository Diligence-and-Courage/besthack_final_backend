import { NextFunction, Request, Response } from 'express';

export const roleMiddleware = async (req: Request, resp: Response, next: NextFunction) => {
  next();
};
