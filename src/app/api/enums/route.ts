import path from 'path'
import { promises as fs } from 'fs'
import { NextResponse } from 'next/server'
import { DataEntry } from '@/actions/request'

export async function GET(req: Request) {
    // Получение пути к файлу data.json
    const jsonDirectory = path.join(process.cwd(), 'data')
    const fileContents = await fs.readFile(jsonDirectory + '/data.json', 'utf8')

    // Парсинг данных из файла
    const data: DataEntry[] = JSON.parse(fileContents)

    // Создание множеств для уникальных значений
    const countries = new Set<string>()
    const affiliates = new Set<string>()
    const advertisers = new Set<string>()

    // Проход по данным и заполнение множеств
    data.forEach((item) => {
        if (item.Country) countries.add(item.Country)
        if (item.Affiliate) affiliates.add(item.Affiliate)
        if (item.Advertiser) advertisers.add(item.Advertiser)
    })

    // Преобразование множеств в массивы для удобной работы на клиенте
    const result = {
        countries: Array.from(countries).sort(),
        affiliates: Array.from(affiliates).sort(),
        advertisers: Array.from(advertisers).sort(),
    }

    return NextResponse.json(result)
}
