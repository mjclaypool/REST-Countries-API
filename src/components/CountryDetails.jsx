import { useState, useEffect, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import DarkModeContext from "../store/DarkModeContext";

export default function CountryDetails() {
  const darkModeCtx = useContext(DarkModeContext);
  const [data, setData] = useState();
  const [borderData, setBorderData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const params = useParams();

  useEffect(() =>{fetch(`https://restcountries.com/v3.1/name/${params.country}?fullText=true&fields=name,population,region,subregion,capital,flags,tld,currencies,languages,borders`, {})
    .then((res) => res.json())
    .then((response) => {
      setData(response[0]);
      if(response[0].borders.length != 0){
        fetch(`https://restcountries.com/v3.1/alpha?codes=${formatBorders(response[0].borders)}&fields=name`, {})
        .then((res) => res.json())
        .then((response) => {
          setBorderData(response);
          setIsLoading(false);
      })
      }else{
        setIsLoading(false);
      }
    })
    .catch((error) => console.log(error));

  }, [params.country])


  function formatBorders(borders) {
    let borderCodes = ''
    for (var i=0; i<borders.length; i++) {
      borderCodes += borders[i] + ",";
    }
    return borderCodes
  }

  function formatTLD() {
    let topLevelDomainAsString = data.tld[0];
    for (var i=1; i<data.tld.length; i++) {
      topLevelDomainAsString = topLevelDomainAsString + ", " + data.tld[i];
    }
    return topLevelDomainAsString;
  }

  function formatCurr() {
    var currencies = Object.keys(data.currencies);
    let currenciesAsString = ''
    if (currencies.length!=0){
      currenciesAsString = data.currencies[currencies[0]].name;
      for (var i=1; i<currencies.length; i++) {
        currenciesAsString = currenciesAsString + ", " + data.currencies[currencies[i]].name;
      }
    }
    return currenciesAsString;
  }

  function formatLang() {
    var langs =  Object.keys(data.languages);
    let languagesAsString = data.languages[langs[0]];
    for (var i=1; i<langs.length; i++) {
      languagesAsString = languagesAsString + ", " + data.languages[langs[i]];
    }
    return languagesAsString;
  }

  function formatPop() {
    let formattedPopulation = data.population.toString();
    for (var i=formattedPopulation.length-3; i>0; i=i-3) {
      formattedPopulation = formattedPopulation.substring(0,i) + "," + formattedPopulation.substring(i,formattedPopulation.length)
    }
    return formattedPopulation;
  }


  return (
    <div
      id="country-details-section"
      className={darkModeCtx.mode == 'Dark Mode' ?
        `flex flex-col h-[92vh] px-8 md:px-16 lg:px-32
        bg-dark-theme-bg text-dark-theme-txt`
        :
        `flex flex-col h-[92vh] px-8 md:px-16 lg:px-32
        bg-light-theme-bg text-light-theme-txt`}
    >
      <div id="back-btn" className="py-16">
        <Link
          to="/"
          className={darkModeCtx.mode == 'Dark Mode' ?
            `font-nunito text-base rounded-md shadow-md py-2 px-10 no-underline
            bg-dark-theme-elem text-dark-theme-txt`
            :
            `font-nunito text-base rounded-md shadow-md py-2 px-10 no-underline
            bg-light-theme-elem text-light-theme-txt`
          }
        >
          Back
        </Link>
      </div>
      {!isLoading &&
        <div id="country-details" className="flex flex-col lg:flex-row gap-[10%] items-center">
          <img
            id="country-flag"
            className="w-4/5 shadow-md md:w-3/5 lg:w-2/5"
            src={data.flags.png}
          />
          <div id="country-content" className="w-4/5 my-8 md:w-3/5 lg:w-2/5">
            <h1 id="country-name" className="font-nunito text-3xl my-4">
              {data.name.common}
            </h1>
            <div id="country-stats" className="flex flex-col lg:flex-row gap-[5%] my-8">
              <div className="mb-4 lg:mb-0">
                <h3 id="country-official-name" className="font-nunito text-base my-1">
                  Official Name: {data.name.official}
                </h3>
                <h3 id="country-population" className="font-nunito text-base my-1">
                  Population: {formatPop()}
                </h3>
                <h3 id="country-region" className="font-nunito text-base my-1">
                  Region: {data.region}
                </h3>
                <h3 id="country-subregion" className="font-nunito text-base my-1">
                  Sub Region: {data.subregion}
                </h3>
                <h3 id="country-capital" className="font-nunito text-base my-1">
                  Capital: {data.capital}
                </h3>
              </div>
              <div>
                <h3 id="country-tld" className="font-nunito text-base my-1">
                  Top Level Domain: {formatTLD()}
                </h3>
                <h3 id="country-currencies" className="font-nunito text-base my-1">
                  Currencies: {formatCurr()}
                </h3>
                <h3 id="country-languages" className="font-nunito text-base my-1">
                  Languages: {formatLang()}
                </h3>
              </div>
            </div>
            <div id="country-borders" className="flex flex-wrap items-center gap-3 my-8">
              <h3 className="font-nunito text-base my-1">
                Border Countries:
              </h3>
              {data.borders.length!=0 && borderData.map(neighbor => (
                <Link
                  to={`/${neighbor.name.common}`}
                  key={neighbor.name.common}
                  className={darkModeCtx.mode == 'Dark Mode' ?
                    `font-nunito text-base rounded-md shadow-md py-1.5 px-6 no-underline
                    bg-dark-theme-elem text-dark-theme-txt`
                    :
                    `font-nunito text-base rounded-md shadow-md py-1.5 px-6 no-underline
                    bg-light-theme-elem text-light-theme-txt`
                  }
                >
                  {neighbor.name.common}
                </Link>
              ))}
              {data.borders.length==0 && <p>None</p>}
            </div>
          </div>
        </div>
      }
    </div>
  )
}