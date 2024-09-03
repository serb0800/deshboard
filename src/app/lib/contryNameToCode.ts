export const countryNameToCode: Record<string, string> = {
    "Mexico": "MX",
    "Ecuador": "EC",
    "Chilie": "CL",
    "Uruguay": "UY",
    "Dominican Republic": "DO",
    "Peru": "PE",
    "Costa Rica": "CR",
    "Guatemala": "GT",
    "Colombia": "CO",
    "France": "FR",
    "United Kingdom": "GB",
    "Canada": "CA",
    "Australia": "AU",
    "Philipines": "PHL",
    "Japan": "JP",
    "India": "IN",
    "Turkey": "TR",
    "Norway": "NO",
    "Sweden": "SE",
};

export const ContryCodeToName = Object.fromEntries(Object.entries(countryNameToCode).map(([key, val]) => [val, key]))