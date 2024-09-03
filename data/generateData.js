const fs = require('fs');

// Список стран с диапазонами Leads и CR%
const countries = [
  { code: "MX", name: "Mexico", leadsMin: 803, leadsMax: 1008, crMin: 2.2, crMax: 5.23 },
  { code: "EC", name: "Ecuador", leadsMin: 105, leadsMax: 355, crMin: 2.5, crMax: 4.88 },
  { code: "CL", name: "Chilie", leadsMin: 259, leadsMax: 441, crMin: 2.3, crMax: 4.42 },
  { code: "UY", name: "Uruguay", leadsMin: 153, leadsMax: 322, crMin: 3.22, crMax: 6.11 },
  { code: "DO", name: "Dominican Republic", leadsMin: 95, leadsMax: 308, crMin: 2.11, crMax: 5 },
  { code: "PE", name: "Peru", leadsMin: 158, leadsMax: 326, crMin: 3.2, crMax: 4.38 },
  { code: "CR", name: "Costa Rica", leadsMin: 142, leadsMax: 205, crMin: 2.39, crMax: 5.52 },
  { code: "GT", name: "Guatemala", leadsMin: 83, leadsMax: 309, crMin: 2.88, crMax: 5.25 },
  { code: "CO", name: "Colombia", leadsMin: 93, leadsMax: 277, crMin: 2.37, crMax: 4.21 },
  { code: "FR", name: "France", leadsMin: 105, leadsMax: 331, crMin: 8.10, crMax: 15.22 },
  { code: "UK", name: "United Kingdom", leadsMin: 82, leadsMax: 301, crMin: 6, crMax: 15.22 },
  { code: "CA", name: "Canada", leadsMin: 48, leadsMax: 249, crMin: 7.83, crMax: 16.32 },
  { code: "AU", name: "Australia", leadsMin: 67, leadsMax: 288, crMin: 7.33, crMax: 16.44 },
  { code: "PH", name: "Philipines", leadsMin: 65, leadsMax: 488, crMin: 2.11, crMax: 5.34 },
  { code: "JP", name: "Japan", leadsMin: 73, leadsMax: 158, crMin: 5.64, crMax: 14.28 },
  { code: "IN", name: "India", leadsMin: 105, leadsMax: 433, crMin: 2.55, crMax: 5.22 },
  { code: "TR", name: "Turkey", leadsMin: 63, leadsMax: 208, crMin: 4.33, crMax: 9.58 },
  { code: "NO", name: "Norway", leadsMin: 42, leadsMax: 108, crMin: 10.11, crMax: 16.25 },
  { code: "SE", name: "Sweden", leadsMin: 56, leadsMax: 89, crMin: 7.84, crMax: 17.33 },
  { code: "CH", name: "Switzerland", leadsMin: 25, leadsMax: 57, crMin: 13.28, crMax: 18.59 },
  { code: "DE", name: "Germany", leadsMin: 31, leadsMax: 53, crMin: 10.05, crMax: 14.22 },
  { code: "RU", name: "Russia", leadsMin: 131, leadsMax: 285, crMin: 1.43, crMax: 3.22 },
  { code: "IT", name: "Italy", leadsMin: 44, leadsMax: 72, crMin: 7.33, crMax: 13.11 },
  { code: "ZA", name: "South Africa", leadsMin: 88, leadsMax: 124, crMin: 5.33, crMax: 9.83 },
];

// Список аффилиатов
const affiliates = [
  "LMLI 23", "LMLI 24", "LMLI 25", "LMLI 26", "LMLI 27", "LMLI 28", "LMLI 29",
  "LMLI 30", "LMLI 31", "LMLI 32", "LMLI 33", "LMLI 34", "LMLI 35", "LMLI 36",
  "LMLI 37", "LMLI 38", "LMLI 39", "LMLI 40", "LMLI 41", "LMLI 42", "LMLI 43",
  "LMLI 44", "LMLI 45", "LMLI 46", "LMLI 47"
];

// Список рекламодателей
const advertisers = [
  "Desk #7", "Desk #8", "Desk #9", "Desk #10", "Desk #11", "Desk #12", "Desk #13",
  "Desk #14", "Desk #15", "Desk #16", "Desk #17", "Desk #18", "Desk #19", "Desk #20",
  "Desk #21", "Desk #22", "Desk #23", "Desk #24"
];

// Функция для генерации случайного числа в заданном диапазоне
function getRandomInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Функция для генерации данных
function generateData() {
  const data = [];

  // Даты с 17 января 2024 по 11 декабря 2024
  const startDate = new Date("2024-01-17");
  const endDate = new Date("2024-12-11");

  let currentDate = startDate;
  
  while (currentDate <= endDate) {
    countries.forEach(country => {
      const leads = getRandomInRange(country.leadsMin, country.leadsMax);
      const cr = (Math.random() * (country.crMax - country.crMin) + country.crMin).toFixed(2);
      const deposits = Math.floor(leads * (cr / 100));

      const record = {
        Country: country.name,
        Affiliate: affiliates[getRandomInRange(0, affiliates.length - 1)],
        Advertiser: advertisers[getRandomInRange(0, advertisers.length - 1)],
        Date_UTC: currentDate.toISOString(),
        Leads: leads,
        Deposits: deposits,
        Conversion_Rate: cr,
      };

      data.push(record);
    });

    // Переход к следующему дню
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return data;
}

// Генерация данных и запись их в файл
const generatedData = generateData();
fs.writeFileSync('./data/generated_data.json', JSON.stringify(generatedData, null, 2));

console.log('Данные успешно сгенерированы и сохранены в файл generated_data.json');