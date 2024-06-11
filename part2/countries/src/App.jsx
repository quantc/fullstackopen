import { useEffect, useState } from "react"
import countriesService from "./services/countries"
import Countries from "./components/Countries"

function App() {
  const [countryFilter, setCountryFilter] = useState("")
  const [countries, setCountries] = useState(null)

  const hookGetAllCountries = () => {
    countriesService.getAll().then((resp) => {
      setCountries(resp)
    })
  }

  useEffect(hookGetAllCountries, [])

  if (!countries) {
    return null
  }

  const handleFilterChange = (event) => {
    setCountryFilter(event.target.value)
  }

  return (
    <>
      <div>
        <label>find countries </label>
        <input value={countryFilter} onChange={handleFilterChange}></input>
      </div>

      <Countries countriesList={countries} filter={countryFilter} />
    </>
  )
}

export default App
