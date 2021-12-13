const express = require("express");
const inquirer = require("inquirer");
const mysql = require("mysql");
require("console.table");

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

db.connect(function (err) {
  if (err) throw err;
  
  startPrompt();
});

function startPrompt(){
  inquirer.prompt([
  {
    type: 'list',
    name:'userChoice',
    message: 'What would you like to do?',
    choices: [
    'Add Role',
    'Add Department',
    'Add Employee',
    'View All Employees',
    'View Employees By Department',
    'Update Employee Role',
    'Remove Employee',
    'Exit'
    ]
      
  }
]).then((res)=>{
  console.log(res.userChoice);
  switch(res.userChoice){
    case 'Add Role':
      viewAllEmployees();
      break;
    case 'Add Department':
      viewEmployeesByDepartment();
      break;
    case 'Add Employee':
      addEmployee();
      break;
    case 'View All Employees':
      removeEmployee();
      break;
    case 'View Employees By Department':
      updateEmployeeRole();
      break;
    case 'Update Employee Role':
      addRole();
      break;
    case 'Remove Employee':
      addDepartment();
      break;
    case 'Exit':
      connection.end();
      break;
    }
    
  }).catch((err)=>{
if(err)throw err;
});
}

function addRole(){
  var query = 
  `SELECT 
    department.id, 
    department.name, 
    role.salary
  FROM employee
  JOIN role
    ON employee.role_id = role.id
  JOIN department
    ON department.id = role.department_id
  GROUP BY department.id, department.name`

  connection.query(query,(err, res)=>{
    if(err)throw err;
    const department = res.map(({ id, name }) => ({
      value: id,
      name: `${id} ${name}`
    }));
    console.table(res);
    addToRole(department);
  });
}

function addToRole(department){
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "Role title: "
      },
      {
        type: "input",
        name: "salary",
        message: "Role Salary: "
      },
      {
        type: "list",
        name: "department",
        message: "Department: ",
        choices: department
      },
    ]).then((res)=>{
      let query = `INSERT INTO role SET ?`;

      connection.query(query, {
          title: res.title,
          salary: res.salary,
          department_id: res.department
      },(err, res)=>{
          if(err) throw err;
          firstPrompt();
      });
  });
}