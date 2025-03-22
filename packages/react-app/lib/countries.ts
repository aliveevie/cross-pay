import type { CountryData } from "./types"

// Define West African countries
const westAfricanCountryCodes = [
  "BJ", // Benin
  "BF", // Burkina Faso
  "CV", // Cape Verde
  "CI", // Cote d'Ivoire
  "GM", // Gambia
  "GH", // Ghana
  "GN", // Guinea
  "GW", // Guinea-Bissau
  "LR", // Liberia
  "ML", // Mali
  "MR", // Mauritania
  "NE", // Niger
  "NG", // Nigeria
  "SN", // Senegal
  "SL", // Sierra Leone
  "TG"  // Togo
];

// Fallback data in case API fails
export const africaCountries: CountryData[] = [
  { name: "Nigeria", code: "NG", currency: "NGN", flag: "https://flagcdn.com/ng.svg" },
  { name: "Ghana", code: "GH", currency: "GHS", flag: "https://flagcdn.com/gh.svg" },
  { name: "Kenya", code: "KE", currency: "KES", flag: "https://flagcdn.com/ke.svg" },
];

// Function to fetch West African countries from REST Countries API
export async function fetchWestAfricanCountries(): Promise<CountryData[]> {
  try {
    const response = await fetch("https://restcountries.com/v3.1/all?fields=name,cca2,currencies,flags");
    const data = await response.json();
    
    // Filter to West African countries and map to our format
    const countries = data
      .filter((country: any) => westAfricanCountryCodes.includes(country.cca2))
      .map((country: any) => {
        // Get the first currency code and symbol
        const currencyCode = Object.keys(country.currencies || {})[0] || "";
        const currencySymbol = currencyCode ? country.currencies[currencyCode].symbol : "";
        
        return {
          name: country.name.common,
          code: country.cca2,
          currency: currencyCode,
          currencySymbol: currencySymbol,
          flag: country.flags.svg || country.flags.png
        };
      })
      .sort((a: CountryData, b: CountryData) => a.name.localeCompare(b.name));
      
    return countries;
  } catch (error) {
    console.error("Failed to fetch countries:", error);
    return africaCountries; // Return fallback data if API fails
  }
}

