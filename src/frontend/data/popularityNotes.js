export default function popularityNotes(num) {
  let notesNumber = Math.ceil(num / 20);
  let notesIcon = '\u266B';
  let notes = new Array(notesNumber).fill(notesIcon);
  return notes.join('_');
}