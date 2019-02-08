const fs = require("fs");

const fetchNotes = () => {
  // Sync
  try {
    const noteString = fs.readFileSync("notes-data.json");
    return JSON.parse(noteString.toString());
  } catch (error) {
    return [];
  }
};

const saveNotes = notes => {
  fs.writeFile("notes-data.json", JSON.stringify(notes), err => {
    if (err) console.log("Note Could not be added:", err);
  });
};

const addNotes = (title, body) => {
  const notes = fetchNotes();
  const note = {
    title,
    body
  };
  // make note title unique
  const duplicateNote = notes.filter(note => note.title === title);

  if (duplicateNote.length === 0) {
    // push the note object into the notes array
    notes.push(note);
    setTimeout(() => {
      saveNotes(notes);
    }, 500);

    return note;
  }
};

const getAll = () => {
  return fetchNotes();
};

const getNote = title => {
  const notes = fetchNotes();
  const filteredNote = notes.filter(note => note.title === title);
  return filteredNote[0];
};

const removeNote = title => {
  // fetch the note
  const notes = fetchNotes();
  const filteredNote = notes.filter(note => note.title !== title);
  saveNotes(filteredNote);

  return notes.length !== filteredNote.length;
};

const logNote = note => {
  console.log("Note Found");
  console.log("----------");
  console.log(`Title: ${note.title}`);
  console.log(`Body: ${note.body}`);
};

module.exports = {
  addNotes,
  getAll,
  getNote,
  removeNote,
  logNote
};
