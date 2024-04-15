"use server";
import { IData } from "@/types";
import path from "path";
import { promises as fs } from "fs";
import { v4 } from "uuid";
import { Country, SearchOutput, byCountry } from "country-code-lookup";

export async function getData(): Promise<{
  data: IData[];
  AffiliateList: string[];
  CountryList: string[];
}> {
  const data = await fs.readFile(
    path.resolve(process.cwd(), "src/app/data/5000_examples.json"),
    "utf-8",
  );
  const AffiliateList = new Set<string>();
  const CountryList = new Set<string>();
  const _data: IData[] = (JSON.parse(data) as IData[]).map((d) => {
    const country = byCountry(d.Country) as Country;
    AffiliateList.add(d.Affiliate);
    CountryList.add(country.iso2);

    if (!country) {
      console.error("contryNot", d);
    }
    return {
      ...d,
      date_ms: Date.parse(d.Date_UTC),
      country: country,
      Conversion_Rate: Math.round(((d.Deposits * 100) / d.Leads) * 100) / 100,
      key: v4(),
    };
  });

  return {
    data: _data,
    AffiliateList: Array.from(AffiliateList),
    CountryList: Array.from(CountryList),
  };
}
