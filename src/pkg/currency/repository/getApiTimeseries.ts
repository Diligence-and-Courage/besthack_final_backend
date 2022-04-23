import axios from 'axios';

import { ApiTimeSeriesProps, TimeSeries, TimeSeriesValues } from '../../../models';

const subDuration: Record<TimeSeries, string> = {
  '10m': '&interval=1min&outputsize=10',
  '30m': '&interval=1min&outputsize=30',
  '1h': '&interval=1min&outputsize=60',
  '4h': '&interval=5min&outputsize=48',
};

export const getApiTimeSeries = async ({
  duration,
  code,
  base,
}: ApiTimeSeriesProps): Promise<TimeSeriesValues[]> => {
  const query = `https://api.twelvedata.com/time_series?apikey=${process.env.TWELVE_DATA_API_KEY}`;
  const {
    data: { values },
  } = await axios.get<{
    values: (Omit<TimeSeriesValues, 'time'> & { datetime: string })[];
  }>(`${query}${subDuration[duration]}&symbol=${base}/${code}`);

  return values.map<TimeSeriesValues>(({ datetime, ...rest }) => ({ time: datetime, ...rest }));
};
