const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
var reviews = require('./db/db.json');

PORT = process.env.PORT || 5000

//middleware json & url encoding
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//set default folder for serving html.
app.use(express.static('public'));

// Serve the index.html for the root path
app.get('/', (req, res) => {
  
  res.sendFile(path.join(__dirname, '/public/index.html'));
 
});

// Serve the notes.html for the notes path
app.get('/notes', (req, res) => {
  
  res.sendFile(path.join(__dirname, '/public/notes.html'));
 
});

app.get('/api/notes', (req, res) => {
  console.info(`GET /api/notes`);
  res.json(reviews);
});

app.post('/api/notes', (req, res) => {
  console.info(`POST /api/notes`);
  
  const {title, text} = req.body;
console.log(req.body);

  if (title && text) {
    const newNote = {
      title,
      text
    }
  // };

  reviews.push(newNote);

  const updatedNotes =  JSON.stringify(reviews);

  fs.writeFile('./db/db.json',updatedNotes,(err)=>{
    if (err) 
    console.log(err);
    else {
      console.log("Data writen to the JSON file");
      const response ={
        status: "success",
        body: newNote
      }
      res.status(200).json(response);
    }

  });
  };
});


app.listen(PORT,()=>console.log(`Server listening on http://localhost:${PORT}/`));