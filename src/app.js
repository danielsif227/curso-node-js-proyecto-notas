console.log('Cargada aplicación de notes...')
const notes = require('./notes')

const { argv } = require('yargs')

let command = argv._[0]
console.log('Command: ', command)

switch (command) {
  case 'add':
    console.log('Añadiendo nueva nota')

    var note = notes.addNote(argv.title, argv.body)
    if (note) {
      console.log('Nota creada')
      console.log(`\tTítulo: ${note.title}`)
      console.log(`\tTexto: ${note.body}`)
    } else {
      console.log('Ya existe una nota con este título');
    }

    break
  case 'list':
    var allNotes = notes.getAll();
    console.log(`Mostrando ${allNotes.length} notas.`);
    allNotes.forEach((note) => notes.logNote(note));
    break
  case 'read':
    var note = notes.getNote(argv.title)
    if (note) {
      console.log('Nota encontrada:')
      notes.logNote(note)
    } else {
      console.log('Nota no entontrada')
    }
    break
  case 'remove':
    console.log('Borrando nota')
    var noteRemoved = notes.removeNote(argv.title)
    var message = noteRemoved ? 'Nota borrada' : 'Nota no encontrada'
    console.log(message)
    break
  default:
    console.log('Comando desconocido')
    break
}
