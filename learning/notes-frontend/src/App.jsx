import { useState, useEffect } from "react"
import Note from "./components/Note"
import Notification from "./components/Notification"
import noteService from "./services/notes"
import Footer from "./components/Footer"

const App = () => {
  const [notes, setNotes] = useState(null)
  const [newNote, setNewNote] = useState("a new note..")
  const [showAll, setShowAll] = useState(true)
  const [errorMessage, setErrorMessage] = useState(null)

  const notesUrl = "http://localhost:3001/notes"

  useEffect(() => {
    noteService.getAll().then((initialData) => {
      setNotes(initialData)
    })
  }, [])

  if (!notes) {
    return null
  }

  const addNote = (event) => {
    event.preventDefault()
    const notesObject = {
      content: newNote,
      important: Math.random() < 0.5,
    }

    noteService.create(notesObject).then((response) => {
      console.log(response)

      setNotes(notes.concat(response))
      setNewNote("")
    })
  }

  const toggleImportanceOf = (id) => {
    const url = `${notesUrl}/${id}`
    const note = notes.find((n) => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then((response) => {
        setNotes(notes.map((note) => (note.id === id ? response : note)))
      })
      .catch((error) => {
        setErrorMessage(
          `Note <${note.content}> was already deleted from the server`
        )

        setTimeout(() => {
          setErrorMessage(null)
        }, 3000)

        setNotes(notes.filter((note) => note.id !== id))
      })
  }

  const deleteNote = (id) => {
    noteService.deleteNote(id).then(() => {
      setNotes(notes.filter((note) => note.id !== id))
    })
  }

  const handleNoteChange = (event) => {
    setNewNote(event.target.value)
  }

  const notesToShow = showAll ? notes : notes.filter((note) => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage} />
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? "important" : "all"}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => (
          <Note
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportanceOf(note.id)}
            deleteNote={() => deleteNote(note.id)}
          />
        ))}
      </ul>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>

      <Footer />
    </div>
  )
}

export default App
