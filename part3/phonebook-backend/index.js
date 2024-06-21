const express = require("express")
const app = express()
app.use(express.json())

let entries = require("./data.json")

app.get("/api/persons", (request, response) => {
  response.json(entries)
})

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id)
  const person = entries.find((e) => e.id === id)

  if (person) {
    response.json(person)
  } else {
    response.statusMessage = `Person of id=${id} doesn't exist.`
    response.status(404).end()
  }
})

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id)
  entries = entries.filter((e) => e.id !== id)

  response.sendStatus(204)
})

app.post("/api/persons", (request, response) => {
  let id = entries.length > 0 ? Math.random() * 10000 : 1

  const person = request.body
  person.id = id.toFixed(0)
  entries = entries.concat(person)

  response.json(person)
})

app.get("/info", (request, response) => {
  const numberOfPeople = entries.length
  const requestTime = new Date(Date.now()).toString()

  response.send(`Phonebook has info for ${numberOfPeople} people<br/>
    ${requestTime}`)
})

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
