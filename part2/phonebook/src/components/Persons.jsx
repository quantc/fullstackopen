const Persons = ({ persons, deleteItem }) => {
  return persons.map((person) => (
    <div key={person.name}>
      {person.name} {person.number}
      <button onClick={() => deleteItem(person.id)}>Delete</button>
    </div>
  ))
}

export default Persons
