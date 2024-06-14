import React, { useEffect, useState } from "react";
import "./currencyConvertor.css";
import CurrencySelect from "./CurrencySelect";
import { CurrencySelectInterface } from "./interface";
import { MdOutlineSwapHorizontalCircle } from "react-icons/md";
import { getQueryResponse } from "../../services";
import { CURRENCY_LIST_URL, currencyConvertorURL } from "../../util";

const FAVOURITES = "favourites";

const CurrencyConvertor = () => {
  const [currencyList, setCurrencyList] = useState<string[]>([]);
  const [selectFrom, setSelectFrom] = useState<string>("EUR");
  const [selectTo, setSelectTo] = useState<string>("INR");
  const [value, setValue] = useState<number>(1);
  const [currencyChange, setCurrencyChange] = useState<number>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [favourites, setFavorites] = useState<string[]>(
    JSON.parse(localStorage.getItem(FAVOURITES)) || []
  );

  const handleFavourites = (currency) => {
    let newFavourites = [...favourites];
    if (favourites.includes(currency)) {
      newFavourites = newFavourites.filter((fav) => fav != currency);
    } else {
      newFavourites.push(currency);
    }
    setFavorites(newFavourites);
    localStorage.setItem(FAVOURITES, JSON.stringify(newFavourites));
  };

  const fetchCurrencyList = async () => {
    const data = await getQueryResponse({
      query: CURRENCY_LIST_URL,
    });
    const list = [];
    for (let key in data) {
      list.push(key);
    }
    setCurrencyList(list);
  };

  const currencyFromSelect: CurrencySelectInterface = {
    id: "currencyFromSelect",
    label: "From:",
    currencyList: currencyList,
    state: selectFrom,
    setState: setSelectFrom,
    favourites: favourites,
    handleFavourites: handleFavourites,
  };
  const currencyToSelect: CurrencySelectInterface = {
    id: "currencyToSelect",
    label: "To:",
    currencyList: currencyList,
    state: selectTo,
    setState: setSelectTo,
    favourites: favourites,
    handleFavourites: handleFavourites,
  };

  useEffect(() => {
    fetchCurrencyList();
  }, []);

  const onSwapClick = () => {
    const stateFrom = selectFrom;
    const stateTo = selectTo;
    setSelectFrom(stateTo);
    setSelectTo(stateFrom);
  };

  const onInputChange = (e) => {
    setValue(e.target.value);
  };

  const onConvertClick = async (e) => {
    setLoading(true);
    const currencyChange = await getQueryResponse({
      query: currencyConvertorURL({
        from: selectFrom,
        to: selectTo,
        amount: value,
      }),
    });
    setLoading(false);
    setCurrencyChange(currencyChange.rates[selectTo]);
  };

  return (
    <div className="currencyConvertorContainer">
      <header>Currency Convertor</header>
      <div className="currencySelectContainer">
        <CurrencySelect {...currencyFromSelect} />
        <MdOutlineSwapHorizontalCircle
          className="currencySwap"
          size={20}
          color="444"
          onClick={onSwapClick}
        />
        <CurrencySelect {...currencyToSelect} />
      </div>
      <div className="currencyInputContainer">
        <label htmlFor="inputAmount">Amount:</label>
        <input
          value={value}
          onChange={onInputChange}
          name="inputAmount"
          id="intputAmount"
          type="number"
        ></input>
      </div>
      <footer>
        <button
          disabled={loading}
          onClick={onConvertClick}
          className="convertCurrencyBtn"
        >
          Convert
        </button>
      </footer>
      {currencyChange != null && (
        <div className="currencyAnswer">
          {loading ? "Loading..." : `Currency converted to ${currencyChange}`}
        </div>
      )}
    </div>
  );
};

export default CurrencyConvertor;
