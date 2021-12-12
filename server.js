const express = require('express');
const inquirer = require('inquirer');
const mysql = require('mysql2');

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // Your MySQL username,
    user: 'root',
    // Your MySQL password
    password: 'password',
    database: 'employeesDB'
  },
  console.log('Connected to the employee database.')
);

app.get('/', (req, res) => {
  res.json({
    message: 'Hello World'
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});