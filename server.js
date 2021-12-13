const express = require("express");
const inquirer = require("inquirer");
const mysql = require("mysql");
const conTable = require("console.table");

const connection = mysql.createConnection(
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
  
  let query = "SELECT * FROM department";
  connection.query(query, function(err, res) {
    if (err) throw err;
    console.table(res);
    startPrompt();
  });
  
}

function viewRoles() {
  
  let query = "SELECT * FROM role";
  connection.query(query, function(err, res) {
    if (err) throw err;
    console.table(res);
    startPrompt();
  });
  
}

function viewEmployees() {
  
  let query = "SELECT * FROM employee";
  connection.query(query, function(err, res) {
    if (err) throw err;
    console.table(res);
    startPrompt();
  });
  
}

function addDepartment() {


  inquirer.prompt({
    
      type: "input",
      message: "What is the name of the department?",
      name: "deptName"

  }).then(function(answer){



      connection.query("INSERT INTO department (name) VALUES (?)", [answer.deptName] , function(err, res) {
          if (err) throw err;
          console.table(res)
          startPrompt()
  })
  })
}

function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What's the name of the role?",
        name: "roleName"
      },
      {
        type: "input",
        message: "What is the salary for this role?",
        name: "salaryTotal"
      },
      {
        type: "input",
        message: "What is the department id number?",
        name: "deptID"
      }
    ])
    .then(function(answer) {


      connection.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [answer.roleName, answer.salaryTotal, answer.deptID], function(err, res) {
        if (err) throw err;
        console.table(res);
        startPrompt();
      });
    });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What's the first name of the employee?",
        name: "FirstName"
      },
      {
        type: "input",
        message: "What's the last name of the employee?",
        name: "LastName"
      },
      {
        type: "input",
        message: "What is the employee's role id number?",
        name: "roleID"
      },
      {
        type: "input",
        message: "What is the manager id number?",
        name: "managerID"
      }
    ])
    .then(function(answer) {

      
      connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)", [answer.eeFirstName, answer.eeLastName, answer.roleID, answer.managerID], function(err, res) {
        if (err) throw err;
        console.table(res);
        startPrompt();
      });
    });
}

function updateEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Which employee would you like to update?",
        name: "employeeUpdate"
      },

      {
        type: "input",
        message: "What do you want to update to?",
        name: "updateRole"
      }
    ])
    .then(function(answer) {

      connection.query('UPDATE employee SET role_id=? WHERE first_name= ?',[answer.updateRole, answer.eeUpdate],function(err, res) {
        if (err) throw err;
        console.table(res);
        startPrompt();
      });
    });
}

function quit() {
  connection.end();
  process.exit();
}