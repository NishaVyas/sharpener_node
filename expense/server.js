const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'sharpener'
});

connection.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL: ', err);
    return;
  }
  console.log('Connected to MySQL');
});
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
  });
// Create Expense
app.post('/expenses', (req, res) => {
  const { amount, description, category } = req.body;
  const query = `INSERT INTO Expense (amount, description, category) VALUES (?, ?, ?)`;
  connection.query(query, [amount, description, category], (err, result) => {
    if (err) {
      console.error('Error creating expense: ', err);
      res.status(500).json({ error: 'Error creating expense' });
      return;
    }
    res.status(201).json({ message: 'Expense created successfully', id: result.insertId });
  });
});

// Get All Expenses
app.get('/expenses', (req, res) => {
  connection.query('SELECT * FROM Expense', (err, results) => {
    if (err) {
      console.error('Error retrieving expenses: ', err);
      res.status(500).json({ error: 'Error retrieving expenses' });
      return;
    }
    res.status(200).json(results);
  });
});

// Delete Expense
app.delete('/expenses/:id', (req, res) => {
  const id = req.params.id;
  connection.query('DELETE FROM Expense WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error('Error deleting expense: ', err);
      res.status(500).json({ error: 'Error deleting expense' });
      return;
    }
    res.status(200).json({ message: 'Expense deleted successfully' });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
