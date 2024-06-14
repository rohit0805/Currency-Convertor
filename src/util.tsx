import { CurrencyConvertorParamInterface } from "./interface";

const host = "api.frankfurter.app";
const CURRENCY_LIST_URL = `https://${host}/currencies`;
const currencyConvertorURL = (props: CurrencyConvertorParamInterface) => {
  const { from, to, amount } = props;
  return `https://${host}/latest?amount=${amount}&from=${from}&to=${to}`;
};

export { currencyConvertorURL, CURRENCY_LIST_URL };
