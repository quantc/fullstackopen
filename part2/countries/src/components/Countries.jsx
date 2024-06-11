import { useState } from "react"
import Weather from "./Weather"

const Countries = ({ countriesList, filter }) => {
  const [countryToShow, setCountryToShow] = useState("")
  let countriesFiltered = []

  if (filter.length > 0) {
    countriesFiltered = countriesList.filter((c) =>
      c.name.common.toLowerCase().includes(filter.toLowerCase())
    )
  }

  if (countriesFiltered.length > 10) {
    return "Too many matches, specify another filter"
  } else if (countriesFiltered.length === 1) {
    return <CountryInfo country={countriesFiltered[0]} />
  }

  const selectedCountry = countriesFiltered.find(
    (c) => c.name.common === countryToShow
  )

  return (
    <>
      {countriesFiltered.map((c) => {
        return (
          <div key={c.name.common}>
            {c.name.common + " "}
            <button
              value="show"
              onClick={() => setCountryToShow(c.name.common)}
            >
              show
            </button>
          </div>
        )
      })}

      <CountryInfo country={selectedCountry} />
    </>
  )
}

const CountryInfo = ({ country }) => {
  if (!country) return
  const languages = country.languages && Object.values(country.languages)

  return (
    <div>
      <div>
        <h1>{country.name.official}</h1>
        capital {country.capital ?? "None"} <br />
        area {country.area}
      </div>
      <br />
      <div>
        <b>languages:</b>
        <ul>
          {languages === undefined
            ? "None"
            : languages.map((g) => <li key={g}>{g}</li>)}
        </ul>
      </div>
      <img
        src={country.flags.png}
        alt={country.flags.alt}
        style={{ width: "30%", height: "auto", border: "1px solid black" }}
      />
      <Weather city={country.capital ?? country.name.official} />
    </div>
  )
}

export default Countries
