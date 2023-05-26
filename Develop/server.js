// grabs needed files and express
const express = require("express");
const fs = require("fs");

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

// Post notes from DB.json
app.post("/notes", (req, res) => {
    // incorrect formating
    fs.readFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

// Pulls data from db.json
app.get("/api/notes", (req, res) => {
   const data = req.body; 
});


// sets server
app.listen(PORT, () => {
    console.log(`The server is running.\nVisit http://localhost:${PORT}`);
});