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

export type TimeSeries = '10m' | '30m' | '1h' | '4h';

export type ApiTimeSeriesProps = {
  duration: TimeSeries;
  base: Code;
  code: Code;
};

export type TimeSeriesValues = {
  time: string;
  open: string;
  high: string;
  low: string;
  close: string;
};

export type TimeSeriesRequest = {
  duration: TimeSeries;
  base: Code;
  code: Code;
};
