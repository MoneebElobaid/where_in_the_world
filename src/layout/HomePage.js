import { useEffect, useRef, useState } from "react";
import { useOutletContext, useLoaderData, useSearchParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { getCountries } from "../api";
import Card from "../components/Card";

export function loader() {
  return getCountries();
}

export default function HomePage() {

  const [searchByName, setSearchByName] = useState("");

  const { isDark } = useOutletContext();
  const [openDropDown, setOpenDropDown] = useState(false);
  const filterRef = useRef();

  const countries = useLoaderData();

  const [searchParams, setSearchParams] = useSearchParams();
  const regionFilter = searchParams.get("region");

  const displayedCountries = displayCountries(); 

  const inputFilterRef = useRef();

  function displayCountries() {
    let filteredByRegion;
    if(regionFilter) {
      filteredByRegion = countries.filter(country => country.region === regionFilter);
    } else {
      filteredByRegion = countries;
    }
    let displayedCountries;
    if(searchByName !== ""){
      displayedCountries = filteredByRegion.filter(
        country => country.name.toLowerCase().includes(searchByName.toLowerCase())
      );
    } else {
      displayedCountries = filteredByRegion;
    }

    return displayedCountries;
  }

  function filterByRegion(region) {
    if(region) {
      setSearchParams({ region });
      inputFilterRef.current.placeholder = region;
    } else {
      setSearchParams({});
      inputFilterRef.current.placeholder = "All";
    }
  }

  useEffect(() => {
    inputFilterRef.current.placeholder = regionFilter || "Filter By Region";
  }, []);

  useEffect(() => {
    function handler(e) {
      if(!filterRef.current.contains(e.target)) {
        setOpenDropDown(false);
      }
    }
    document.addEventListener("mousedown", handler);

    return () => {
      document.removeEventListener("mousedown", handler);
    };
  });

  return (
    <div className="container">
        <div className="form">
          <div className={`search ${isDark ? "dark" : "light"}`}>
            <FontAwesomeIcon className="icon" icon={faSearch} />
            <input 
              type="text"
              placeholder="Search for a country..."
              name="searchByName"
              value={searchByName}
              onChange={(e) => setSearchByName(e.target.value)}
            />
          </div>
          <div 
            className={`filter ${isDark ? "dark" : "light"}`}
            onClick={() => setOpenDropDown(prev => !prev)}
            ref={filterRef}
          >
            <div 
              className="dropdown">
              <input 
                type="text"
                placeholder="Filter by Region"
                readOnly
                ref={inputFilterRef}
              />
              <span className={`down-arrow ${openDropDown && "up"}`}></span>
            </div>
            <div className="options" style={{ display: openDropDown ? "block" : "none" }}>
              <div onClick={() => filterByRegion("")}>All</div>
              <div onClick={() => filterByRegion("Africa")}>Africa</div>
              <div onClick={() =>  filterByRegion("Americas")}>America</div>
              <div onClick={() => filterByRegion("Asia")}>Asia</div>
              <div onClick={() => filterByRegion("Europe")}>Europe</div>
              <div onClick={() =>  filterByRegion("Oceania")}>Oceania</div>
            </div>
          </div>
        </div>
        <section className={`countries-cards ${isDark ? "dark" : "light"}`}>
          {
            displayedCountries.map(country => (
              <Card key={country.name} country={country} search={searchParams} />
            ))
          }
        </section>
    </div>
  );
}
