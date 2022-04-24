import { Code, CurrencyCost, CurrencyInfo } from './Currency';

export type Role = 'common' | 'user' | 'admin';

export interface User {
  id: number;
  email: string;
  password: string;
  balance: number;
  attempts: number;
  isBlocked: number;
  role: Role;
}

export type UserInfo = Omit<User, 'password'>;
export type CreateUserInfo = Omit<User, 'id' | 'balance' | 'attempts' | 'isBlocked'>;
export type AuthUserInfo = Pick<User, 'password' | 'email'>;

export type UserCurrenciesAdd = {
  userId: number;
  code: Code;
  count: number;
};

export type UserCurrency = CurrencyInfo &
  Omit<CurrencyCost, 'code' | 'baseCode'> & { count: number };
