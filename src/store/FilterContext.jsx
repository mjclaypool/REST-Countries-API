import { useState, useEffect, createContext, useReducer } from "react";

const FilterContext = createContext({
  data: [],
  visibleData: [],
  activeSearch: '',
  activeRegion: '',
  filterRegion: (region) => {},
  searchCountries: (userInput) => {},
})

function filterReducer(state, action) {
  if (action.type === "INITIALIZE") {
    return {...state, data: action.response, visibleData: action.response}
  }

  if (action.type === "REGION") {
    var filteredData = [];
    if (state.activeSearch == "" || state.activeSearch == undefined) {
      filteredData = state.data.filter((country) => country.region == action.region);
    } else {
      filteredData = state.data.filter((country) => country.region == action.region);
      filteredData = filteredData.filter((country) => country.name.common.startsWith(state.activeSearch));
    }

    return {...state, visibleData: filteredData, activeRegion: action.region}
  }

  if (action.type === "SEARCH") {
    var filteredData = [];
    if (state.activeRegion == undefined) {
      filteredData = state.data.filter((country) => country.name.common.startsWith(action.userInput));
    } else {
      filteredData = state.data.filter((country) => country.region == state.activeRegion);
      filteredData = filteredData.filter((country) => country.name.common.startsWith(action.userInput));
    }

    return {...state, visibleData: filteredData, activeSearch: action.userInput}
  }

  return state;
};

export function FilterContextProvider({children}) {
  const [filter, dispatchFilterAction] = useReducer(filterReducer, { data: [], visibleData: [], activeSearch: '' });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() =>{fetch(`https://restcountries.com/v3.1/all?fields=name,population,region,capital,flags`, {})
    .then((res) => res.json())
    .then((response) => {
      dispatchFilterAction({ type: "INITIALIZE", response});
      setIsLoading(false);
    })
    .catch((error) => console.log(error));
  },[])


  function filterRegion(region) {
    dispatchFilterAction({ type: "REGION", region })
  }

  function searchCountries(userInput) {
    dispatchFilterAction({ type: "SEARCH", userInput })
  }

  const filterContext = {
    data: filter.data,
    visibleData: filter.visibleData,
    activeSearch: filter.activeSearch,
    activeRegion: filter.activeRegion,
    filterRegion,
    searchCountries,
  };

  return <FilterContext.Provider value={filterContext}>{children}</FilterContext.Provider>
}

export default FilterContext;