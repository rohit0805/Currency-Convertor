export interface CurrencySelectInterface{
  id: string,
  label: string,
  currencyList: string[],
  state: string,
  setState: React.Dispatch<React.SetStateAction<string>>,
  favourites: string[],
  handleFavourites: (currency: string)=>void
}