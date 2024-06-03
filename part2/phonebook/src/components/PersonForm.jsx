const PersonForm = ({ addPerson, handleNewPerson, handleNewNumber }) => {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input onChange={handleNewPerson} />
      </div>
      <div>
        number: <input onChange={handleNewNumber} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}
export default PersonForm
