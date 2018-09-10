console.log('Cargado módulo de notas...')
const fs = require('fs')

/* FUNCION PUBLICA: visualizar una nota */
var logNote = (note) => {
  console.log(`\tTítulo: ${note.title}`)
  console.log(`\tTexto: ${note.body}`)
}

/* Leer notas de fichero */
var fetchNotes = () => {
  try {
    var notesString = fs.readFileSync('notes-data.json');
    return JSON.parse(notesString);
  } catch (e) {
    return [];
  }
}

/* Guardar notas a fichero */
var saveNotes = (notes) => {
  fs.writeFileSync('notes-data.json', JSON.stringify(notes));
}

/* FUNCION EXPORT: Añadir nota */
const addNote = (title, body) => {
  let notes = []
  const note = {
    title,
    body
  }

  try {
    const notesString = fs.readFileSync('notes-data.json')
    notes = JSON.parse(notesString)
  } catch (error) {  }

  var duplicateNotes = notes.filter((note) => note.title === title)

  if (duplicateNotes.length === 0) {
    notes.push(note)
    saveNotes(notes)
    return note
  }

}

/* FUNCION EXPORT: Obtener notas */
const getAll = () => {
  return fetchNotes()
}

/* FUNCION EXPORT: Obtener nota */
const getNote = (title) => {
  var notes = fetchNotes()
  var filteredNotes = notes.filter((note) => note.title === title)
  return filteredNotes[0]
}

/* FUNCION EXPORT: Eliminar nota */
const removeNote = (title) => {
  var notes = fetchNotes()
  var filteredNotes = notes.filter((note) => note.title !== title)
  saveNotes(filteredNotes)
  return notes.length !== filteredNotes.length
}

/* export */
module.exports = {
  addNote,
  getAll,
  getNote,
  removeNote,
  logNote
}