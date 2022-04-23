import 'express';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      PORT?: string;
      PWD: string;
      ALLOW_LIST: string;
      PGUSER?: string;
      PGHOST?: string;
      PGPASSWORD?: string;
      PGDATABASE?: string;
      PGPORT?: string;
      NEWSAPI_KEY: string;
    }
  }
}

interface Locals {
  userId?: number;
}

declare module 'express' {
  export interface Response {
    locals: Record<any, any> & Locals;
  }
}

export {};