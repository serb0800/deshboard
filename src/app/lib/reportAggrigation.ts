'use server'
interface Entry {
    Country: string;
    Affiliate: string;
    Date_UTC: string;
    Leads: number;
    Deposits: number;
    Conversion_Rate: number;
  }
  
  interface AggregatedEntry {
    [key: string]: {
      [key: string]: string | number;
      Count: number;
      TotalLeads: number;
      TotalDeposits: number;
      TotalConversionRate: number;
      AverageConversionRate: number;
    };
  }

export default function aggregateData(data: Entry[], ...params: string[]): AggregatedEntry[] {
    const aggregation: AggregatedEntry = {};
  
    data.forEach((entry) => {
        // @ts-ignore
      const key = params.map((param) => entry[param]).join('_');
      if (!aggregation[key]) {
          // @ts-ignore
        aggregation[key] = {
          Count: 0,
          TotalLeads: 0,
          TotalDeposits: 0,
          TotalConversionRate: 0,
        };
        params.forEach((param) => {
             // @ts-ignore
          aggregation[key][param] = entry[param];
        });
      }
  
      aggregation[key].Count++;
      aggregation[key].TotalLeads += entry.Leads;
      aggregation[key].TotalDeposits += entry.Deposits;
      aggregation[key].TotalConversionRate += entry.Conversion_Rate;
    });
  
    Object.values(aggregation).forEach((entry) => {
      entry.AverageConversionRate = entry.TotalConversionRate / entry.Count;
       // @ts-ignore
      delete entry.TotalConversionRate;
       // @ts-ignore
      delete entry.Count;
    });
    // @ts-ignore
    return Object.values(aggregation);
  }
  
  // Пример данных
  const data: Entry[] = [
    {
      Country: "United Kingdom",
      Affiliate: "Affiliate A",
      Date_UTC: "2024-12-27T21:05:29.812Z",
      Leads: 2691,
      Deposits: 232,
      Conversion_Rate: 8.62,
    },
    // Добавьте больше данных здесь, если нужно
  ];
  
  // Вызов функции и вывод агрегированных результатов по нескольким параметрам
  const aggregatedData = aggregateData(data, "Country", "Affiliate", "Date_UTC");
