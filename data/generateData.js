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
    2958109,
    2958104,
    2958101,
    2958099,
    2958091,
    2958087,
    2958084,
    2958081,
    2958076,
    2958072,
    2958069,
    2958062,
    2958058,
    2958053,
    2958042,
    2958040,
    2958039,
    2958037,
    2958034,
    2958030,    
    2958029,
    2958027,
    2958024,
    2958021,
    2958018,
    2958014,
    2958011,
    2958008,
    2958005,
]

// Список рекламодателей
const advertisers = [
    'Desk #3',
    'Desk #8',
    'Desk #11',
    'Desk #16',
    'Desk #17',
    'Desk #21',
    'Desk #24',
    'Desk #29',
    'Desk #32',
    'Desk #39',
    'Desk #42',
    'Desk #47',
    'Desk #51',
    'Desk #55',
    'Desk #62',
    'Desk #67',
    'Desk #74',
    'Desk #83',
]

// Функция для генерации случайного числа в заданном диапазоне
function getRandomInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min
}

// Функция для генерации уникального ID
function generateUniqueId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2)
}

/**
 * АЛГОРИТМ РАСПРЕДЕЛЕНИЯ ЛИДОВ:
 * 
 * 1. Для каждого дня и каждой страны:
 *    - Генерируем общий CR для страны в этот день (crMin - crMax)
 *    - Генерируем общее количество лидов (leadsMin - leadsMax)
 *    - Рассчитываем общее количество депозитов = лиды * (CR / 100)
 * 
 * 2. Распределение по affiliates:
 *    - Выбираем 1-3 случайных affiliates
 *    - Распределяем общие лиды между выбранными affiliates
 * 
 * 3. Для каждого affiliate:
 *    - Выбираем 1-3 случайных advertisers
 *    - Распределяем лиды affiliate между выбранными advertisers
 *    - Распределяем депозиты пропорционально лидам
 * 
 * 4. Результат: структурированные данные с корректным CR для страны в день
 *    и правильным распределением лидов/депозитов по цепочке: Страна → Affiliate → Advertiser
 */
function generateData() {
    const data = []

    // Даты с 17 января 2024 по 11 декабря 2025
    const startDate = new Date('2024-01-17')
    const endDate = new Date('2026-12-11')

    let currentDate = startDate

    while (currentDate <= endDate) {
        // Для каждой страны генерируем данные на день
        countries.forEach((country) => {
            // 1. Генерируем общий CR для страны в этот день
            const countryCR = (
                Math.random() * (country.crMax - country.crMin) +
                country.crMin
            ).toFixed(2)
            
            // 2. Генерируем общее количество лидов для страны в этот день
            const totalLeadsForCountry = getRandomInRange(country.leadsMin, country.leadsMax)
            
            // 3. Рассчитываем общее количество депозитов для страны с точностью до целого
            const totalDepositsForCountry = Math.round(totalLeadsForCountry * (countryCR / 100))
            
            // 4. Выбираем от 1 до 3 аффилиатов для работы в этой стране
            const numAffiliates = getRandomInRange(1, 3)
            const selectedAffiliates = []
            
            // Выбираем случайных аффилиатов (без повторений)
            for (let i = 0; i < numAffiliates; i++) {
                let affiliate
                do {
                    affiliate = affiliates[getRandomInRange(0, affiliates.length - 1)]
                } while (selectedAffiliates.includes(affiliate))
                selectedAffiliates.push(affiliate)
            }

            // 5. Случайно распределяем общие лиды между выбранными аффилиатами
            const affiliateLeadsInfo = []
            let remainingLeads = totalLeadsForCountry

            // Создаем массив весов для случайного распределения
            const affiliateWeights = selectedAffiliates.map(() => Math.random())

            selectedAffiliates.forEach((affiliate, affiliateIndex) => {
                let affiliateLeads
                
                if (affiliateIndex === selectedAffiliates.length - 1) {
                    // Последний аффилиат получает все оставшиеся лиды
                    affiliateLeads = Math.max(0, remainingLeads)
                } else {
                    // Случайное распределение на основе весов
                    const totalWeight = affiliateWeights.reduce((sum, weight) => sum + weight, 0)
                    const proportion = affiliateWeights[affiliateIndex] / totalWeight
                    const maxLeads = Math.max(1, remainingLeads - (selectedAffiliates.length - affiliateIndex - 1))
                    
                    affiliateLeads = Math.min(
                        Math.max(1, Math.floor(totalLeadsForCountry * proportion)),
                        maxLeads
                    )
                }
                
                remainingLeads -= affiliateLeads
                affiliateLeadsInfo.push({
                    affiliate: affiliate,
                    leads: affiliateLeads
                })
            })
            
            // Распределяем депозиты пропорционально лидам
            let remainingDeposits = totalDepositsForCountry
            affiliateLeadsInfo.forEach((info, index) => {
                const proportion = info.leads / totalLeadsForCountry
                const affiliateDeposits = index === affiliateLeadsInfo.length - 1 
                    ? remainingDeposits // Последний аффилиат получает все оставшиеся депозиты
                    : Math.round(totalDepositsForCountry * proportion)
                
                remainingDeposits -= affiliateDeposits
                info.deposits = affiliateDeposits
            })
            
            // Теперь обрабатываем каждого аффилиата
            affiliateLeadsInfo.forEach((affiliateInfo) => {
                const affiliate = affiliateInfo.affiliate
                const affiliateLeads = affiliateInfo.leads
                const affiliateDeposits = affiliateInfo.deposits

                // 7. Для каждого аффилиата выбираем от 1 до 3 рекламодателей
                const numAdvertisers = getRandomInRange(1, 3)
                const selectedAdvertisers = []
                
                // Выбираем случайных рекламодателей (без повторений)
                for (let i = 0; i < numAdvertisers; i++) {
                    let advertiser
                    do {
                        advertiser = advertisers[getRandomInRange(0, advertisers.length - 1)]
                    } while (selectedAdvertisers.includes(advertiser))
                    selectedAdvertisers.push(advertiser)
                }

                // 8. Собираем информацию о лидах для пропорционального распределения депозитов между рекламодателями
                const advertiserLeadsInfo = []
                
                // Распределяем лиды между рекламодателями
                const leadsPerAdvertiser = Math.floor(affiliateLeads / numAdvertisers)
                const remainingAffiliateLeads = affiliateLeads - (leadsPerAdvertiser * numAdvertisers)
                
                selectedAdvertisers.forEach((advertiser, advertiserIndex) => {
                    // Каждый рекламодатель получает базовое количество лидов + возможный остаток
                    let advertiserLeads = leadsPerAdvertiser
                    if (advertiserIndex === 0) {
                        advertiserLeads += remainingAffiliateLeads // Остаток отдаем первому рекламодателю
                    }
                    
                    advertiserLeadsInfo.push({
                        advertiser: advertiser,
                        leads: advertiserLeads
                    })
                })
                
                // Случайное распределение депозитов с учетом весов (количество лидов)
                let remainingAffiliateDeposits = affiliateDeposits

                // Создаем массив весов на основе количества лидов
                const weights = advertiserLeadsInfo.map(info => info.leads)
                const totalWeight = weights.reduce((sum, weight) => sum + weight, 0)

                advertiserLeadsInfo.forEach((info, index) => {
                    let advertiserDeposits
                    
                    if (index === advertiserLeadsInfo.length - 1) {
                        // Последний рекламодатель получает все оставшиеся депозиты
                        advertiserDeposits = Math.max(0, remainingAffiliateDeposits)
                    } else {
                        // Вычисляем базовую долю на основе веса
                        const baseProportion = info.leads / totalWeight
                        const baseDeposits = Math.floor(affiliateDeposits * baseProportion)
                        
                        // Добавляем случайное отклонение от -20% до +20%
                        const randomFactor = 0.8 + Math.random() * 0.4 // от 0.8 до 1.2
                        const maxDeposits = Math.max(1, remainingAffiliateDeposits - (advertiserLeadsInfo.length - index - 1))
                        
                        advertiserDeposits = Math.min(
                            Math.max(1, Math.floor(baseDeposits * randomFactor)),
                            maxDeposits
                        )
                        
                        // Дополнительная защита от отрицательных значений
                        advertiserDeposits = Math.max(0, advertiserDeposits)
                    }
                    
                    remainingAffiliateDeposits -= advertiserDeposits
                    info.deposits = advertiserDeposits
                })

                advertiserLeadsInfo.forEach((advertiserInfo) => {
                    const advertiser = advertiserInfo.advertiser
                    const advertiserLeads = advertiserInfo.leads
                    const advertiserDeposits = advertiserInfo.deposits

                    // 10. Пересчитываем CR для конкретной записи на основе фактических лидов и депозитов
                    const actualCR = advertiserLeads > 0 ? (advertiserDeposits / advertiserLeads * 100).toFixed(2) : "0.00"
                    
                    // 11. Создаем запись с распределенными данными
                    const record = {
                        id: generateUniqueId(),
                        Country: country.name,
                        Affiliate: affiliate,
                        Advertiser: advertiser,
                        Date_UTC: currentDate.toISOString(),
                        Leads: advertiserLeads,
                        Deposits: advertiserDeposits,
                        Conversion_Rate: actualCR,
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
    './data/data.json',
    JSON.stringify(generatedData, null, 2)
)

console.log(
    'Данные успешно сгенерированы и сохранены в файл generated_data.json'
)
