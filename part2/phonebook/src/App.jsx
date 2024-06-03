import { useState } from "react"
import SearchFilter from "./components/SearchFilter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"

const App = () => {
  const [persons, setPersons] = useState([
    { id: "1", name: "Toby", number: "111" },
    { id: "2", name: "Bob", number: "222" },
    { id: "3", name: "Eliza", number: "333" },
    { id: "4", name: "John", number: "444" },
  ])
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filterBy, setFilterBy] = useState("")

  const handleNewPerson = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log("event", event.target.value)
    setFilterBy(event.target.value)
  }

  const addPerson = () => {
    event.preventDefault()

    const newPerson = {
      id: newName,
      name: newName,
      number: newNumber,
    }

    const personExists = persons.some((p) => p.name === newName)

    if (personExists) {
      alert(`Person ${newPerson.name} already exists in phone book`)
    } else setPersons(persons.concat(newPerson))
  }

  const personsFiltered =
    filterBy.length > 0
      ? persons.filter((p) =>
          p.name.toLowerCase().includes(filterBy.toLowerCase())
        )
      : persons

  return (
    <>
      <h2>Phonebook</h2>
      <SearchFilter onChange={handleFilterChange} />

      <h2>Add new person</h2>
      <PersonForm
        addPerson={addPerson}
        handleNewPerson={handleNewPerson}
        handleNewNumber={handleNewNumber}
      />

      {/* <Persons /> */}
      <h2>Numbers</h2>
      <Persons persons={personsFiltered} />
    </>
  )
}

export default App
