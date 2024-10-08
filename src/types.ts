import { Country, SearchOutput } from "country-code-lookup";

export interface IData {
  Country: string;
  country: Country;
  Affiliate: string;
  date_ms: number;
  Date_UTC: string;
  Leads: number;
  Deposits: number;
  Conversion_Rate: number;
}

export interface IFilter {
  timeframe?: [string, string]
  isTest: boolean
  advertiserIds?: string[];
  affiliateIds?: string[];
  country?: string[],
}

export type IFilterParam = { Affiliate: string[] } | { country: Country[] };
