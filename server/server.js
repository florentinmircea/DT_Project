//example code
const fs = require('fs');
const express = require('express')
var cors = require('cors');
const app = express()
const port = 3000
var booksData = require('./books.json');
app.use(cors());
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello from Backend Server!')
})

app.get('/books', (req, res) => {
  res.json(booksData);
});

app.put('/books', (req, res) => {
  let dataToInsert = req.body;
  fs.readFile('books.json', function (err, data) {
    var json = JSON.parse(data)
    dataToInsert["id"]=booksData.length-1;
    json.push(dataToInsert)
    // console.log(json);
    fs.writeFileSync('books.json',JSON.stringify(json));
})
  booksData[booksData.length] = req.body;
  res.json('Book saved!');
});

app.delete('/books/:index',(req, res) => {
  fs.readFile('books.json', function (err, data) {
    var json = JSON.parse(data)
    json.splice(req.params.index, 1);
    // console.log(json);
    for(let i=0;i<json.length;i++)
    {
      json[i].id=i;
      booksData[i].id=i;
    }
    fs.writeFileSync('books.json',JSON.stringify(json));
})
  booksData.splice(req.params.index, 1);
  res.json('Book deleted!');
});


app.put('/booksupdate', (req, res) => {
  
  let dataToInsert = req.body;
  // console.log(dataToInsert);
  booksData.splice(dataToInsert.id, 1);
  // dataToInsert["id"]=booksData.length-1;
  fs.readFile('books.json', function (err, data) {
    var json = JSON.parse(data)
    json[dataToInsert.id].title=dataToInsert.title;
    json[dataToInsert.id].author=dataToInsert.author;
    json[dataToInsert.id].imageLink=dataToInsert.imageLink;
    json[dataToInsert.id].description=dataToInsert.description;

    // dataToInsert["id"]=booksData.length-1;
    //json.push(dataToInsert)
     console.log(json);
    fs.writeFileSync('books.json',JSON.stringify(json));
})
  booksData[booksData.length] = req.body;
  res.json('Book saved!');
});

app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`)
})
