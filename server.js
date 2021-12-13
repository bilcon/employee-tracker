const express = require("express");
const inquirer = require("inquirer");
const mysql = require("mysql");
const conTable = require("console.table");

const db = mysql.createConnection(
  { 
    host: "localhost",
    port: "3301",
    user: "root",
    password: "password",
    database: "employeesDB"
  },
  console.log('Connected to the employee database.')
);

connection.connect(function (err) {
  if (err) throw err;
  
  startPrompt();
});

function startPrompt(){
  inquirer.prompt({
    type: 'list',
    name:'userChoice',
    message: 'What would you like to do?',
    choices: [
      "View departments",
      "View roles",
      "View employees",
      "Add department",
      "Add role",
      "Add employee",
      "Update employee role",
      "Quit"
    ]   
  })
  .then(function(result) {
    console.log("You entered: " + result.option);

    switch (result.option) {
      case "View departments":
        viewDepartment();
        break;
      case "View roles":
        viewRole();
        break;
      case "View employees":
        viewEmployee();
        break;
      case "Add department":
        addDepartment();
        break;
      case "Add role":
        addRoles();
        break;
      case "Add employee":
        addEmployees();
        break;
      case "Update employee role":
        updateEmployee();
        break;
      default:
        quit();
    }
  });
}

function viewDepartment() {
  // select from the db
  let query = "SELECT * FROM department";
  connection.query(query, function(err, res) {
    if (err) throw err;
    console.table(res);
    startScreen();
  });
  // show the result to the user (console.table)
}

function viewRoles() {
  // select from the db
  let query = "SELECT * FROM role";
  connection.query(query, function(err, res) {
    if (err) throw err;
    console.table(res);
    startScreen();
  });
  // show the result to the user (console.table)
}

function viewEmployees() {
  // select from the db
  let query = "SELECT * FROM employee";
  connection.query(query, function(err, res) {
    if (err) throw err;
    console.table(res);
    startScreen();
  });
  // show the result to the user (console.table)
}

