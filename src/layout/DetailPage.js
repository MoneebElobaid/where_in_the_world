import { useOutletContext, useLoaderData, useParams } from "react-router-dom";
import { getCountries } from "../api";
import CustomBox from "../components/CustomBox";

export function loader() {
    return getCountries();
}

export default function DetailPage() {

    const { country: countryParam } = useParams();
    const { isDark } = useOutletContext();
    const countries = useLoaderData();

    let country;
    for(let i = 0; i < countries.length; i++) {
        if(countries[i].name === countryParam) {
            country = countries[i];
            break;
        }
    }
    let borders = [];
    for(let c of countries) {
        if(country.borders?.includes(c.alpha3Code)) {
            borders.push({ alphaCode: c.alpha3Code, name: c.name });
        }
    }

    const flag = country.flag;
    let usedFlag;
    if(typeof flag === "object") {
        usedFlag = flag.png;
    } else {
        usedFlag = flag;
    }
    
    return (
        <div className="container">
            <div style={{ marginBottom: "3em" }}><CustomBox content="Back" isDark={isDark} /></div>
            <section className={`details ${isDark ? "dark" : "light"}`}>
                <div className="image">
                    <img src={usedFlag} alt={country.name} />
                </div>
                <div className="info">
                    <h2 className="country-name">{country.name}</h2>
                    <div className="country-detail">
                        <div className="info1">
                            <p><span>Native Name: </span>{country.nativeName}</p>
                            <p><span>Population: </span>{country.population}</p>
                            <p><span>Region: </span>{country.region}</p>
                            <p><span>Sub Region: </span>{country.subregion}</p>
                            <p><span>Capital: </span>{country.capital || "Unkown"}</p>
                        </div>
                        <div className="info2">
                            <p><span>Top Level Domain: </span>{country.topLevelDomain[0]}</p>
                            <p>
                                <span>Currencies: </span>
                                {
                                    country.currencies?.length > 1 ? 
                                    country.currencies?.map((currency, i) => {
                                        if(i === country.currencies?.length - 1) return currency?.name;
                                        else return `${currency?.name}, `;
                                    }) : 
                                    country.currencies && country.currencies[0].name
                                }
                            </p>
                            <p>
                                <span>Languages: </span>
                                {
                                    country.languages.length > 1 ? 
                                    country.languages.map((language, i) => {
                                        if(i === country.languages.length - 1) return language.name;
                                        else return `${language.name}, `;
                                    }) : 
                                    country.languages[0].name
                                }
                            </p>
                            <p>
                                <span>Calling Codes: </span>
                                {
                                    country.callingCodes.length > 1 ? 
                                    country.callingCodes.map((callingCode, i) => {
                                        if(i === country.callingCodes.length - 1) return callingCode;
                                        else return `${callingCode}, `;
                                    }) : 
                                    country.callingCodes[0]
                                }
                            </p>
                            <p>
                                <span>Timezones: </span>
                                {
                                    country.timezones.length > 1 ? 
                                    country.timezones.map((timezone, i) => {
                                        if(i === country.timezones.length - 1) return timezone;
                                        else return `${timezone}, `;
                                    }) : 
                                    country.timezones[0]
                                }
                            </p>
                        </div>
                    </div>
                    {
                        country.borders && 
                        (
                            <div className="border-countries">
                                <div className="title">Border Countries:</div>
                                <div className="borders">
                                    {borders.map(border => (
                                        <CustomBox 
                                            key={border.alphaCode}
                                            content={border.alphaCode} 
                                            isDark={isDark}
                                            name={border.name}
                                        />
                                    ))}
                                </div>
                            </div>
                        )
                    }
                </div>
            </section>
        </div>
    );
}
