// grabs needed files and express
const express = require("express");
const fs = require("fs");
const noteData = require("./db/db.json");

// sets express and port 
const app = express();
const PORT = 3001;

//
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes to homepage.html
app.get("/", (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`);
});

// routes to notes.html
app.get("/notes", (req, res) => {
    res.sendFile(`${__dirname}/public/notes.html`);
    
});

// TODO fix this route
// Pulls data from db.json
app.get("/api/notes", (req, res) => {
    res.json(noteData);
});

// adds data to db.json
app.post("/api/notes", (req, res) => {
    let note;
    let newNotes = req.body;

    fs.readFile("./db/db.json", "utf8", (err, data) => {
        // if error logs data
        if (err) {
            console.log(err)
        // other wise adds it to the file
        } else {
            note = JSON.parse(data);
            note.push(newNotes);
            fs.writeFile("./db/db.json", JSON.stringify(note), (err) => {
                err ? console.log(err) : console.log("data added to db.json");
            });
        }});
 });

 // TODO finish this route
 // removes data from db.json
app.delete("/api/notes", (req, res) => {
    let note;
    let removeNote = req.body;

    fs.readFile("./db/db.json", "utf8", (err, data) => {
        // if error console logs error
        if (err) {
            console.log(err)
        // other wise removes it from the file
        } else {
            note = JSON.parse(data);
            let updatedNotes = note.filter((note) => note.title !== removeNote.title);
            updatedNotes = note.filter((note) => note.text !== removeNote.text);

            fs.writeFile("./db/db.json", JSON.stringify(note), (err) => {
                err ? console.log(err) : console.log("data removed from db.json");
            });
        }});
 });


// sets server
app.listen(PORT, () => {
    console.log(`The server is running.\nVisit http://localhost:${PORT}`);
});