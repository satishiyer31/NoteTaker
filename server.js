const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

PORT = process.env.PORT || 5000

//middleware json & url encoding
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//set default folder for serving html.
app.use(express.static('public'));

// GET request for ALL reviews
app.get('/', (req, res) => {
  
  res.sendFile(path.join(__dirname, '/public/index.html'));
 
});

app.listen(PORT);