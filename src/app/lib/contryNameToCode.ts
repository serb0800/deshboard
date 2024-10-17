export const countryNameToCode: Record<string, string> = {
    Mexico: 'MX',
    Ecuador: 'EC',
    Chilie: 'CL',
    Uruguay: 'UY',
    'Dominican Republic': 'DO',
    Peru: 'PE',
    'Costa Rica': 'CR',
    Guatemala: 'GT',
    Colombia: 'CO',
    France: 'FR',
    'United Kingdom': 'GB',
    Canada: 'CA',
    Australia: 'AU',
    Philipines: 'PH',
    Japan: 'JP',
    India: 'IN',
    Turkey: 'TR',
    Norway: 'NO',
    Switzerland: 'CH',
    Germany: 'DE',
    Russia: 'RU',
    Italy: 'IT',
    'South Africa': 'ZA',
    Sweden: 'SE',
    Argentina: 'AR',
}

export const ContryCodeToName = Object.fromEntries(
    Object.entries(countryNameToCode).map(([key, val]) => [val, key])
)
