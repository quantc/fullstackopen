const Countries = ({ countriesList, filter }) => {
  let countriesFiltered = []

  if (filter.length > 0) {
    countriesFiltered = countriesList.filter((c) =>
      c.name.common.toLowerCase().includes(filter.toLowerCase())
    )
  }

  if (countriesFiltered.length > 10) {
    return "Too many matches, specify another filter"
  } else if (countriesFiltered.length === 1) {
    const found = countriesFiltered[0]
    const languages = Object.values(found.languages)

    return (
      <div>
        <div>
          <h1>{found.name.common}</h1>
          capital {found.capital} <br />
          area {found.area}
        </div>
        <br />
        <div>
          <b>languages:</b>
          <ul>
            {languages.map((g) => (
              <li key={g}>{g}</li>
            ))}
          </ul>
        </div>
        <img
          src={found.flags.png}
          alt={found.flags.alt}
          style={{ width: "30%", height: "auto", border: "1px solid black" }}
        />
      </div>
    )
  }

  return countriesFiltered.map((c) => {
    return <div key={c.name.common}>{c.name.common}</div>
  })
}

export default Countries
