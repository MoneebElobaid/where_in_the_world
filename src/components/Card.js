import { Link } from "react-router-dom";

export default function Card({ country, search }) {

    const flag = country.flag;
    let usedFlag;
    if(typeof flag === "object") {
        usedFlag = flag.png;
    } else {
        usedFlag = flag;
    }

  return (
    <Link to={`/${country.name}`} className="country-card" state={{ search: `?${search.toString()}` }}>
        <img src={usedFlag} alt={country.name}/>
        <div className="info">
            <h3>{country.name}</h3>
            <p><span>Population: </span>{country.population}</p>
            <p><span>Region: </span>{country.region}</p>
            <p><span>Capital: </span>{country.capital || "Unknown"}</p>
        </div>
    </Link>
  );
}
