import { useContext } from "react";
import { Link } from "react-router-dom";
import DarkModeContext from "../store/DarkModeContext";

export default function CountryCard( {country} ) {
  const darkModeCtx = useContext(DarkModeContext);

  let formattedPopulation = country.population.toString();
  for (var i=formattedPopulation.length-3; i>0; i=i-3) {
    formattedPopulation = formattedPopulation.substring(0,i) + "," + formattedPopulation.substring(i,formattedPopulation.length)
  }

  return (
    <Link
      to={`/${country.name.common}`}
      className={darkModeCtx.mode == 'Dark Mode' ?
        `flex flex-col w-80 h-96 rounded-md cursor-pointer shadow-md no-underline
        bg-dark-theme-elem text-dark-theme-txt`
        :
        `flex flex-col w-80 h-96 rounded-md cursor-pointer shadow-md no-underline
        bg-light-theme-elem text-light-theme-txt`
      }
    >
      <img
        id="country-card-flag"
        className="w-full h-48 object-cover rounded-t-md"
        src={country.flags.png}
      />
      <div id="country-card-overview" className="my-auto px-8">
        <h2 id="country-card-name" className="font-nunito text-2xl mb-4">
          {country.name.common}
        </h2>
        <h3 id="country-card-population" className="font-nunito text-base my-1">
          Population: {formattedPopulation}
        </h3>
        <h3 id="country-card-region" className="font-nunito text-base my-1">
          Region: {country.region}
        </h3>
        <h3 id="country-card-capital" className="font-nunito text-base my-1">
          Capital: {country.capital}
        </h3>
      </div>
    </Link>
  )
}