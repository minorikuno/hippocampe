const express = require('express');
const mysql = require('mysql');
const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));

const connection = mysql.createConnection({
  host:'localhost',
  user:'root',
  password:'minori0816',
  database:'Hippocampe'
});

app.get('/', (req,res) => {
  connection.query(
    'SELECT * FROM memoire',
  (error, results) => {
    res.render('hello.ejs', {memoire: results});
  }
  );
  
});

app.get('/add', (req,res) => {
  res.render('add.ejs');
});

app.post('/create', (req,res) => {
  connection.query(
    'INSERT INTO memoire(name) VALUES(?)',
    [req.body.memoireName],
    (error, results) => {
      console.log(results);
      res.redirect('/');
    }
  );
});

app.post('/delete/:id', (req, res) => {
  connection.query(
    'DELETE FROM memoire WHERE id = ?',
    [req.params.id],
    (error, results) => {
      res.redirect('/');
    });
});

app.get('/edit/:id', (req, res) => {
  connection.query(
    'SELECT * FROM memoire WHERE id = ?',
    [req.params.id],
    (error, results) => {
      res.render('edit.ejs', {memoir: results[0]});
    });
});

app.post('/update/:id', (req, res) => {
  connection.query(
    'UPDATE memoire SET name = ? WHERE id = ?',
    [req.body.memoireName, req.params.id],
    (error, results) => {
      res.redirect('/');
    });
});



app.listen(3000, () => {
  console.log('server started')
  });
