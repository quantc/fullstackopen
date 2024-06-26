const express = require("express")
const app = express()
app.use(express.json())

app.use(express.static("dist"))

var corsOptions = {
  // origin: "http://localhost:5173",
  // optionSuccessStatus: 200,
}
const cors = require("cors")
app.use(cors())

let notes = [
  {
    id: 1,
    content: "HTML is easyyyyyy",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only JavaScript",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true,
  },
]

const requestLogger = (request, response, next) => {
  console.log("Method:", request.method)
  console.log("Path:  ", request.path)
  console.log("Body:  ", request.body)
  console.log("---")
  next()
}
app.use(requestLogger)

app.get("/", cors(corsOptions), (request, response) => {
  response.send("<h1>Hello World!</h1>")
})

app.get("/api/notes", cors(corsOptions), (request, response) => {
  response.json(notes)
})

app.get("/api/notes/:id", cors(corsOptions), (request, response) => {
  const id = Number(request.params.id)
  const note = notes.find((note) => note.id === id)

  if (note) {
    response.json(note)
  } else {
    response.statusMessage = `Note of id=${id} does NOT exist`
    response.status(404).end()
  }
})
app.delete("/api/notes/:id", cors(corsOptions), (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter((note) => note.id !== id)

  response.status(204).end()
})
app.post("/api/notes", cors(corsOptions), (request, response) => {
  const maxId = notes.length > 0 ? Math.max(...notes.map((n) => n.id)) : 0

  const note = request.body
  note.id = maxId + 1
  notes = notes.concat(note)

  response.json(note)
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log("-------------------")
})
