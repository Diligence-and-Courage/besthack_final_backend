export type CurrencyInfo = {
  currencyCode: string;
  name: string;
  symbol: string;
  countryCode: string;
  countryName: string;
};

export type CurrencyCost = {
  baseCode: string;
  code: string;
  cost: number;
  change: number;
  percentChange: number;
};

export type Currency = {
  baseCode: CurrencyInfo;
  code: CurrencyInfo;
  cost: number;
  change: number;
  percentChange: number;
};

export type Code = 'EUR' | 'RUB' | 'USD' | 'CHF' | 'GBP' | 'CNY';
