import path from 'path';
import { promises as fs } from 'fs';
import { parseISO, format } from 'date-fns';
import { NextResponse } from 'next/server';
import { DataEntry, GroupedData, IReqestBody } from '@/actions/request';
import dayjs from 'dayjs';

export async function POST(req: Request) {
  // Получение данных из тела запроса
  const body: IReqestBody = await req.json();
  const { filter, groupBy, offset, limit, sortBy, sortOrder } = body.input;

  // Получение пути к файлу data.json
  const jsonDirectory = path.join(process.cwd(), 'data');
  const fileContents = await fs.readFile(jsonDirectory + '/data.json', 'utf8');

  // Парсинг данных из файла
  const data: DataEntry[] = JSON.parse(fileContents);

  // Фильтрация данных по параметрам
  let filteredData = data.filter((item) => new Date(item.Date_UTC).getTime() < Date.now());

  if (filter?.timeframe) {
    const [startTime, endTime] = filter.timeframe;
    filteredData = filteredData.filter((item) => {
      const itemDate = new Date(item.Date_UTC).getTime();

      return itemDate >= new Date(startTime).getTime() && itemDate <= new Date(endTime).getTime()+86400000;
    });
  }

  if (filter.affiliateIds && filter.affiliateIds.length) {
    filteredData = filteredData.filter((item) => {
      return filter.affiliateIds?.includes(item.Affiliate);
    });
  }
  if (filter.advertiserIds && filter.advertiserIds.length) {
    filteredData = filteredData.filter((item) => {
      return filter.advertiserIds?.includes(item.Advertiser);
    });
  }
  if (filter.country && filter.country.length) {
    filteredData = filteredData.filter((item) => {
      return filter.country?.includes(item.Country);
    });
  }

  // Группировка данных
  const groupedData = filteredData.reduce((acc, item, index) => {
    const dateKey = groupBy.includes('day')
      ? format(parseISO(item.Date_UTC), 'yyyy-MM-dd')
      : '';

    const countryKey = groupBy.includes('country') ? item.Country : '';
    const affiliateKey = groupBy.includes('affiliateId') ? item.Affiliate : '';
    const advertiserKey = groupBy.includes('advertiserId') ? item.Advertiser : '';

    const groupKey = `${dateKey}_${countryKey}_${affiliateKey}_${advertiserKey}`;

    if (!acc[groupKey]) {
      acc[groupKey] = {
        // id: `${index}_${groupKey}`,
        id: item.id as string,
        Date: dateKey,
        Country: countryKey,
        Affiliate: affiliateKey,
        Advertiser: advertiserKey,
        TotalLeads: 0,
        TotalDeposits: 0,
        ConversionRate: 0,
      };
    }

    acc[groupKey].TotalLeads += item.Leads;
    acc[groupKey].TotalDeposits += item.Deposits;
    acc[groupKey].ConversionRate =
    roundToTwo((acc[groupKey].TotalDeposits / acc[groupKey].TotalLeads) * 100);

    return acc;
  }, {} as Record<string, GroupedData>);

  // Преобразование объекта в массив
  let resultArray = Object.values(groupedData);

  // Сортировка данных
  if (sortBy) {
    resultArray.sort((a, b) => {
      let compare = 0;
      if (a[sortBy] < b[sortBy]) {
        compare = -1;
      } else if (a[sortBy] > b[sortBy]) {
        compare = 1;
      }
      return sortOrder === 'descend' ? compare * -1 : compare;
    });
  }

  // Применение offset и limit
  const result = {
    items: resultArray.slice(offset, offset + limit),
    total: resultArray.length,
  };

  await wait();
  return NextResponse.json(result);
}

async function wait(min?: number, max?: number) {
  function getRandomDelay() {
    const minDelay = min || 200;
    const maxDelay = max || 700;
    return Math.floor(Math.random() * (maxDelay - minDelay + 1)) + minDelay;
  }
  return new Promise((res, rej) => {
    return setTimeout(() => res(undefined), getRandomDelay());
  });
}

function roundToTwo(num:number) {
  return Number(num.toFixed(2));
}