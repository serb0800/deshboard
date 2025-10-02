const fs = require('fs')

// Список стран с диапазонами Leads и CR%
const countries = [
    {
        code: 'MX',
        name: 'Mexico',
        leadsMin: 82,
        leadsMax: 181,
        crMin: 2.68,
        crMax: 3.25,
    },
    {
        code: 'EC',
        name: 'Ecuador',
        leadsMin: 43,
        leadsMax: 107,
        crMin: 2.15,
        crMax: 3.73,
    },
    {
        code: 'CL',
        name: 'Chilie',
        leadsMin: 259,
        leadsMax: 441,
        crMin: 2.3,
        crMax: 4.42,
    },
    {
        code: 'UY',
        name: 'Uruguay',
        leadsMin: 82,
        leadsMax: 242,
        crMin: 2.24,
        crMax: 4.26,
    },
    {
        code: 'DO',
        name: 'Dominican Republic',
        leadsMin: 52,
        leadsMax: 92,
        crMin: 2.1,
        crMax: 4.04,
    },
    {
        code: 'PE',
        name: 'Peru',
        leadsMin: 62,
        leadsMax: 142,
        crMin: 1.96,
        crMax: 3.02,
    },
    {
        code: 'CR',
        name: 'Costa Rica',
        leadsMin: 52,
        leadsMax: 185,
        crMin: 1.38,
        crMax: 3.29,
    },
    {
        code: 'GT',
        name: 'Guatemala',
        leadsMin: 84,
        leadsMax: 173,
        crMin: 1.82,
        crMax: 3.8,
    },
    {
        code: 'CO',
        name: 'Colombia',
        leadsMin: 93,
        leadsMax: 277,
        crMin: 2.37,
        crMax: 4.21,
    },
    {
        code: 'FR',
        name: 'France',
        leadsMin: 15,
        leadsMax: 43,
        crMin: 8.1,
        crMax: 15.22,
    },
    {
        code: 'UK',
        name: 'United Kingdom',
        leadsMin: 31,
        leadsMax: 85,
        crMin: 6,
        crMax: 15.22,
    },
    {
        code: 'CA',
        name: 'Canada',
        leadsMin: 21,
        leadsMax: 72,
        crMin: 7.33,
        crMax: 16.44,
    },
    {
        code: 'AU',
        name: 'Australia',
        leadsMin: 33,
        leadsMax: 78,
        crMin: 11.47,
        crMax: 16.32,
    },
    {
        code: 'PH',
        name: 'Philipines',
        leadsMin: 65,
        leadsMax: 305,
        crMin: 2.11,
        crMax: 5.34,
    },
    {
        code: 'JP',
        name: 'Japan',
        leadsMin: 18,
        leadsMax: 62,
        crMin: 9.95,
        crMax: 14.28,
    },
    {
        code: 'IN',
        name: 'India',
        leadsMin: 67,
        leadsMax: 251,
        crMin: 2.18,
        crMax: 5.22,
    },
    {
        code: 'TR',
        name: 'Turkey',
        leadsMin: 63,
        leadsMax: 208,
        crMin: 4.33,
        crMax: 9.58,
    },
    {
        code: 'NO',
        name: 'Norway',
        leadsMin: 42,
        leadsMax: 108,
        crMin: 10.11,
        crMax: 16.25,
    },
    {
        code: 'SE',
        name: 'Sweden',
        leadsMin: 56,
        leadsMax: 89,
        crMin: 7.84,
        crMax: 17.33,
    },
    {
        code: 'CH',
        name: 'Switzerland',
        leadsMin: 25,
        leadsMax: 57,
        crMin: 13.28,
        crMax: 18.59,
    },
    {
        code: 'DE',
        name: 'Germany',
        leadsMin: 31,
        leadsMax: 53,
        crMin: 10.05,
        crMax: 14.22,
    },
    {
        code: 'RU',
        name: 'Russia',
        leadsMin: 131,
        leadsMax: 285,
        crMin: 1.43,
        crMax: 3.22,
    },
    {
        code: 'IT',
        name: 'Italy',
        leadsMin: 29,
        leadsMax: 62,
        crMin: 6.15,
        crMax: 11.03,
    },
    {
        code: 'ZA',
        name: 'South Africa',
        leadsMin: 88,
        leadsMax: 124,
        crMin: 5.33,
        crMax: 9.83,
    },
    {
        code: 'AR',
        name: 'Argentina',
        leadsMin: 72,
        leadsMax: 138,
        crMin: 2.29,
        crMax: 3.36,
    },
    {
        code: 'NZ',
        name: 'New Zealand',
        leadsMin: 21,
        leadsMax: 48,
        crMin: 8.15,
        crMax: 14.03,
    },
    {
        code: 'SV',
        name: 'Salvador',
        leadsMin: 74,
        leadsMax: 161,
        crMin: 1.38,
        crMax: 3.19,
    },
    {
        code: 'HN',
        name: 'Honduras',
        leadsMin: 82,
        leadsMax: 151,
        crMin: 2.05,
        crMax: 3.08,
    },
    {
        code: 'NI',
        name: 'Nicaragua',
        leadsMin: 48,
        leadsMax: 202,
        crMin: 1.95,
        crMax: 4.05,
    },
    {
        code: 'CL',
        name: 'Chile',
        leadsMin: 30,
        leadsMax: 87,
        crMin: 2.42,
        crMax: 5.85,
    },
    {
        code: 'PY',
        name: 'Paraguay',
        leadsMin: 47,
        leadsMax: 86,
        crMin: 2.02,
        crMax: 3.18,
    },
    {
        code: 'PA',
        name: 'Panama',
        leadsMin: 47,
        leadsMax: 185,
        crMin: 2.02,
        crMax: 3.18,
    },
    {
        code: 'ZA',
        name: 'South Africa',
        leadsMin: 62,
        leadsMax: 118,
        crMin: 3.02,
        crMax: 4.09,
    },
    {
        code: 'KE',
        name: 'Kenya',
        leadsMin: 39,
        leadsMax: 105,
        crMin: 1.02,
        crMax: 3.02,
    },
    {
        code: 'NA',
        name: 'Namibia',
        leadsMin: 42,
        leadsMax: 112,
        crMin: 1.08,
        crMax: 2.31,
    },
    {
        code: 'BW',
        name: 'Botswana',
        leadsMin: 32,
        leadsMax: 82,
        crMin: 1.02,
        crMax: 2.09,
    },
    {
        code: 'ZM',
        name: 'Zambia',
        leadsMin: 23,
        leadsMax: 52,
        crMin: 1.14,
        crMax: 1.92,
    },
    {
        code: 'TZ',
        name: 'Tanzania',
        leadsMin: 33,
        leadsMax: 64,
        crMin: 1.17,
        crMax: 1.82,
    },
]

// Список аффилиатов
const affiliates = [
    '429031',
    '429805',
    '429671',
    '429142',
    '429356',
    '429789',
    '429234',
    '429567',
    '429890',
    '429123',
    '429456',
    '429789',
    '429012',
    '429345',
    '429678',
    '429901',
    '429234',
    '429567',
    '429890',
    '429123',
    '429456',
    '429789',
    '429012',
    '429345',
    '429678',
]

// Список рекламодателей
const advertisers = [
    'Desk #7',
    'Desk #8',
    'Desk #9',
    'Desk #10',
    'Desk #11',
    'Desk #12',
    'Desk #13',
    'Desk #14',
    'Desk #15',
    'Desk #16',
    'Desk #17',
    'Desk #18',
    'Desk #19',
    'Desk #20',
    'Desk #21',
    'Desk #22',
    'Desk #23',
    'Desk #24',
]

// Функция для генерации случайного числа в заданном диапазоне
function getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

// Функция для генерации данных
function generateData() {
    const data = []

    // Даты с 17 января 2024 по 11 декабря 2025
    const startDate = new Date('2024-01-17')
    const endDate = new Date('2025-12-11')

    let currentDate = startDate

    while (currentDate <= endDate) {
        // От 1 до 3 аффилиатов в день
        const numAffiliates = getRandomInRange(1, 3)
        const selectedAffiliates = []
        
        // Выбираем случайных аффилиатов
        for (let i = 0; i < numAffiliates; i++) {
            let affiliate
            do {
                affiliate = affiliates[getRandomInRange(0, affiliates.length - 1)]
            } while (selectedAffiliates.includes(affiliate))
            selectedAffiliates.push(affiliate)
        }

        // Для каждого выбранного аффилиата
        selectedAffiliates.forEach((affiliate) => {
            // От 1 до 3 рекламодателей на аффилиата
            const numAdvertisers = getRandomInRange(1, 3)
            const selectedAdvertisers = []
            
            // Выбираем случайных рекламодателей
            for (let i = 0; i < numAdvertisers; i++) {
                let advertiser
                do {
                    advertiser = advertisers[getRandomInRange(0, advertisers.length - 1)]
                } while (selectedAdvertisers.includes(advertiser))
                selectedAdvertisers.push(advertiser)
            }

            // Для каждого выбранного рекламодателя генерируем данные по странам
            selectedAdvertisers.forEach((advertiser) => {
                countries.forEach((country) => {
                    const leads = getRandomInRange(country.leadsMin, country.leadsMax)
                    const cr = (
                        Math.random() * (country.crMax - country.crMin) +
                        country.crMin
                    ).toFixed(2)
                    const deposits = Math.floor(leads * (cr / 100))

                    const record = {
                        Country: country.name,
                        Affiliate: affiliate,
                        Advertiser: advertiser,
                        Date_UTC: currentDate.toISOString(),
                        Leads: leads,
                        Deposits: deposits,
                        Conversion_Rate: cr,
                    }

                    data.push(record)
                })
            })
        })

        // Переход к следующему дню
        currentDate.setDate(currentDate.getDate() + 1)
    }

    return data
}

// Генерация данных и запись их в файл
const generatedData = generateData()
fs.writeFileSync(
    './data/generated_data.json',
    JSON.stringify(generatedData, null, 2)
)

console.log(
    'Данные успешно сгенерированы и сохранены в файл generated_data.json'
)
