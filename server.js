// grabs needed files and express
const express = require("express");
const fs = require("fs");
const uniqid = require("uniqid");
var noteData = require("./db/db.json");

// sets express and port 
const app = express();
const PORT = process.env.PORT || 3001;

// stage files and formatting  
app.use(express.static("public"));
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

// Pulls data from db.json
app.get("/api/notes", (req, res) => {
    res.json(noteData);
});

// adds data to db.json and refresh
app.post("/api/notes", (req, res) => {
    let newNotes = req.body;
    newNotes.id = uniqid();
    
    fs.readFile("./db/db.json", "utf8", (err, data) => {
        // if error logs data
        if (err) {
            console.log(err)
        // other wise adds it to the file
        } else {
            noteData = JSON.parse(data);
            noteData.push(newNotes);
            fs.writeFile("./db/db.json", JSON.stringify(noteData), (err) => {
                err ? console.log(err) : console.log("data added to db.json");
            });
            res.sendFile(`${__dirname}/public/notes.html`);
        }});
 });

// sets server
app.listen(PORT, () => {
    console.log(`The server is running.\nVisit http://localhost:${PORT}`);
});
