import { useEffect, useState } from "react"
import countriesService from "./services/countries"
import Notification from "./components/Notification"

function App() {
  const [countryFilter, setCountryFilter] = useState("")
  const [countries, setCountries] = useState(null)
  const [notification, setNotification] = useState("")

  const hookGetAllCountries = () => {
    countriesService.getAll().then((resp) => {
      const test = resp.slice(0, 30)
      setCountries(test)
    })
  }

  useEffect(hookGetAllCountries, [])

  if (!countries) {
    return null
  }

  const handleFilterChange = (event) => {
    console.log("event.target.value = ", event.target.value)
    setCountryFilter(event.target.value)
    // setNotification(null)
  }

  let displayCountries = []
  const countriesToShow = countries.filter((c) => {
    return c.name.common.toLowerCase().includes(countryFilter.toLowerCase())
  })

  console.log(`filter matches: ${countriesToShow.length}`)

  if (countriesToShow.length > 10) {
    console.log("more than 10")
    // setNotification("Too many matches, specify another filter")
    displayCountries = []
  } else if (countriesToShow.Length > 1) {
    console.log("more than one country but <10")
    displayCountries = countriesToShow
  } else {
    console.log("one country ", countriesToShow)
  }

  return (
    <>
      <div>
        <label>find countries </label>
        <input value={countryFilter} onChange={handleFilterChange}></input>
      </div>
      <Notification message={notification} />

      {countriesToShow.map((c) => {
        // console.log(c)
        return <div key={c.name.common}>{c.name.common}</div>
      })}
    </>
  )
}

export default App
