const yargs = require("yargs");

const { addNotes, getAll, getNote, removeNote, logNote } = require("./notes");

console.log("starting app");

// console.log("Yargs:", yargs.argv);
// getting the value from yargs
const title = {
  describe: "Title of note",
  demand: true,
  alias: "t"
};
const body = {
  describe: "Body of note",
  demand: true,
  alias: "b"
};

const args = yargs
  .command("add", "Add a new note", {
    title,
    body
  })
  .command("list", "List all notes")
  .command("read", "Read a note", {
    title
  })
  .command("remove", "Remmove a note", {
    title
  })
  .help().argv;

const command = args._[0];

if (command === "add") {
  console.log("Adding note...");
  const note = addNotes(args.title, args.body);
  if (note) {
    console.log("Note Created");
    logNote(note);
  } else {
    console.log("Note title taken!");
  }
} else if (command === "list") {
  const allNotes = getAll();
  console.log(`Printing ${allNotes.length} note(s).`);
  allNotes.forEach(note => logNote(note));
} else if (command === "read") {
  const note = getNote(args.title);
  if (note) {
    console.log("Note Found");
    logNote(note);
  } else {
    console.log("Note not found");
  }
} else if (command === "remove") {
  const noteRemoved = removeNote(args.title);
  const message = noteRemoved ? "Note was removed" : "Note not found";
  console.log(message);
}
