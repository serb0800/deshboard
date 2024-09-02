import { IFilter } from '@/types';
import { SortOrder } from 'antd/es/table/interface';
import axios from 'axios'

export interface DataEntry {
    Country: string;
    Affiliate: string;
    Advertiser: string;
    Date_UTC: string;
    Leads: number;
    Deposits: number;
    Conversion_Rate: string;
    isTest: boolean;
  }
  
  export interface GroupedData {
    id: string
    Date: string;
    Country: string;
    Affiliate: string;
    Advertiser: string;
    TotalLeads: number;
    TotalDeposits: number;
    ConversionRate: number;
  }
  
  export type groupByKey = 'advertiserId' | 'affiliateId' | 'day' | 'country'
  

export interface IResGetList {
  items: GroupedData[]
  total: number
}
  
 export interface IReqestBody {
     input: {
         filter: IFilter
         groupBy: groupByKey[]
         offset: number
         limit: number
         sortBy: keyof GroupedData, 
         sortOrder: SortOrder
     }
 }

export const getListReport = async (params:IReqestBody):Promise<IResGetList> => {
    const res = await axios.post<IResGetList>('/api/report', params || {})

    return res.data
}

export const getAffilatesList = async () => {
  return []
}
export const getAdevertiserList = async () => {
  return []
}