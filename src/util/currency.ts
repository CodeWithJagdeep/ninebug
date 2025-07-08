// utils/currency.ts
export const formatCurrency = (amount: number, currency: string) => {
  const formatter = new Intl.NumberFormat(getLocaleFromCurrency(currency), {
    style: "currency",
    currency: currency,
    minimumFractionDigits: 2,
  });

  return formatter.format(amount);
};

const getLocaleFromCurrency = (currency: string) => {
  // Map currencies to appropriate locales
  const currencyToLocale: Record<string, string> = {
    USD: "en-US",
    INR: "en-IN",
    EUR: "de-DE", // German locale formats EUR properly
    XOF: "fr-FR", // West African CFA franc (used in French-speaking Africa)
    NGN: "en-NG", // Nigerian Naira
  };

  return currencyToLocale[currency] || "en-US";
};

export const getCurrencyForLanguage = (language: string) => {
  const languageToCurrency: Record<string, string> = {
    en: "USD",
    sw: "USD", // Swahili - using USD for simplicity (Tanzania uses TZS, Kenya uses KES)
    yo: "NGN", // Yoruba - Nigerian Naira
    ha: "NGN", // Hausa - Nigerian Naira
    ig: "NGN", // Igbo - Nigerian Naira
    fr: "XOF", // French - West African CFA franc
    es: "USD", // Spanish - using USD for simplicity
  };

  return languageToCurrency[language] || "USD";
};

export const convertPrice = (priceInUSD: number, currency: string) => {
  // Simple conversion rates - in a real app, use current exchange rates from an API
  const conversionRates: Record<string, number> = {
    USD: 1,
    INR: 83.5, // 1 USD = 83.5 INR
    EUR: 0.93, // 1 USD = 0.93 EUR
    XOF: 600, // 1 USD ≈ 600 XOF (approximate)
    NGN: 1500, // 1 USD ≈ 1500 NGN (approximate)
  };

  return priceInUSD * (conversionRates[currency] || 1);
};
