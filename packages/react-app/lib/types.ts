export interface CountryData {
  name: string
  code: string
  currency: string
  phoneCode?: string
  flag: string
  currencySymbol?: string
}

export interface CurrencyData {
  name: string
  code: string
  symbol: string
}

export interface Transaction {
  id: string
  type: "sent" | "received"
  amount: number
  currency: string
  recipient: string
  date: string
  status: string
}

