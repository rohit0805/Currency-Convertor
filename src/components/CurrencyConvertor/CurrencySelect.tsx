import React from "react";
import "./currencyConvertor.css";
import { CurrencySelectInterface } from "./interface";
import { HiOutlineStar, HiStar } from "react-icons/hi2";

const CurrencyInput = (props: CurrencySelectInterface) => {
  //console.log(props, "testing");
  const { currencyList, state, setState, favourites, handleFavourites } = props;
  const isFavourite = favourites.includes(state);
  return (
    <div className="currencySelectChild">
      <label htmlFor={props.id} id={props.id}>
        {props.label}
      </label>
      <select
        onChange={(e) => {
          setState(e.target.value);
        }}
        name={props.id}
        id={props.id}
        value={state}
      >
        {favourites.map((currency) => (
          <option value={currency} key={currency}>
            {currency}
          </option>
        ))}
        <hr />
        {currencyList
          .filter((currency) => !favourites.includes(currency))
          .map((currency) => (
            <option value={currency} key={currency}>
              {currency}
            </option>
          ))}
      </select>
      <button
        className="favouriteCurrency"
        onClick={() => {
          handleFavourites(state);
        }}
      >
        {isFavourite ? <HiStar color="yellow" /> : <HiOutlineStar />}
      </button>
    </div>
  );
};

export default CurrencyInput;
