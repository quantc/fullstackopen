const express = require("express")
const morgan = require("morgan")

const app = express()
app.use(express.json())
app.use(morgan("tiny"))

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
  if (!request.body.name.trim()) {
    response.status(400).send("Name cannot be empty.")
  } else if (!request.body.number.trim()) {
    response.status(400).send("Number cannot be empty.")
  } else if (entries.find((e) => e.name === request.body.name)) {
    response.status(500).send(`Name "${request.body.name}" already exists.`)
  } else {
    let id = entries.length > 0 ? Math.random() * 10000 : 1

    const person = request.body
    person.id = Number(id.toFixed(0))
    entries = entries.concat(person)

    response.json(person)
  }
})

app.get("/info", (request, response) => {
  const numberOfPeople = entries.length
  const requestTime = new Date(Date.now()).toString()

  response.send(`Phonebook has info for ${numberOfPeople} people<br/>
    ${requestTime}`)
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" })
}

app.use(unknownEndpoint)

const PORT = 3001
app.listen(PORT)
console.log(`Server running on port ${PORT}`)
