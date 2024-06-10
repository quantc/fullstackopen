import { useState, useEffect } from "react"
import SearchFilter from "./components/SearchFilter"
import PersonForm from "./components/PersonForm"
import Persons from "./components/Persons"
import personsService from "./services/persons"

const App = () => {
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [filterBy, setFilterBy] = useState("")
  const [persons, setPersons] = useState([])

  const getAllPersons = () => {
    personsService.getAll("http://localhost:3001/persons").then((response) => {
      setPersons(response)
    })
  }

  useEffect(getAllPersons, [])

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
      name: newName,
      number: newNumber,
    }

    const existingPerson = persons.find((p) => p.name === newName)
    if (existingPerson !== undefined) {
      if (
        window.confirm(
          `Person ${newPerson.name} already exists in phone book. Replace old number with a new one?`
        )
      ) {
        const newPerson = { ...existingPerson, number: newNumber }
        personsService.update(existingPerson.id, newPerson).then((response) => {
          setPersons(
            persons.map((p) => (p.id === existingPerson.id ? response : p))
          )
        })
      }
    } else {
      personsService.create(newPerson).then((response) => {
        setPersons(persons.concat(response))
      })
    }
  }

  const deleteItem = (id) => {
    const personToDelete = persons.find((p) => p.id === id)

    if (window.confirm(`Delete ${personToDelete.name}?`)) {
      personsService.deleteItem(id).then(() => {
        setPersons(persons.filter((p) => p.id !== id))
      })
    }
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

      <h2>Numbers</h2>
      <Persons persons={personsFiltered} deleteItem={deleteItem} />
    </>
  )
}

export default App
