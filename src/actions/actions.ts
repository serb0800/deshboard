'use server'
import { IData } from "@/types";
import path from "path";
import { promises as fs } from 'fs';

export async function getData():Promise<IData[]> {
    const data = await fs.readFile(path.resolve(process.cwd(), 'src/app/data/5000_examples.json'), 'utf-8')
    const _data:IData[] = JSON.parse(data);
    return _data 
}