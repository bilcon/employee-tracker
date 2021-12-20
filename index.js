const db = require("./db");
const { prompt } = require("inquirer");
const logo = require("asciiart-logo");
require("console.table");

startPrompt();

function startPrompt() {
  prompt([
    {
      type: "list",
      name: "option",
      message: "What would you like to do?",
      choices: [
        {
          name: "View departments",
          value: "VIEW_DEPARTMENTS",
        },

        {
          name: "View roles",
          value: "VIEW_ROLES",
        },

        {
          name: "View employees",
          value: "VIEW_EMPLOYEES",
        },

        {
          name: "Add department",
          value: "ADD_DEPARTMENT",
        },

        {
          name: "Add role",
          value: "ADD_ROLE",
        },

        {
          name: "Add employee",
          value: "ADD_EMPLOYEE",
        },

        {
          name: "Update employee role",
          value: "UPDATE_EMPLOYEE_ROLE",
        },

        {
          name: "Quit",
          value: "QUIT",
        },
      ],
    },
  ]).then(function (res) {
    console.log("You entered: " + res.option);

    // CASE SHOULD ALL BE SCREAMMING CASE
    switch (res.option) {
      case "VIEW_DEPARTMENTS":
        viewDepartment();
        break;
      case "VIEW_ROLES":
        viewRole();
        break;
      case "VIEW_EMPLOYEES":
        viewEmployees();
        break;
      case "ADD_DEPARTMENT":
        addDepartment();
        break;
      case "ADD_ROLE":
        addRoles();
        break;
      case "ADD_EMPLOYEE":
        addEmployees();
        break;
      case "UPDATE_EMPLOYEE_ROLE":
        updateEmployee();
        break;
      default:
        quit();
    }
  });
}

// View all departments
function viewDepartments() {
  db.findAllDepartments()
    .then(([rows]) => {
      let departments = rows;
      console.log("\n");
      console.table(departments);
    })
    .then(() => startPrompt());
}

function viewRoles() {
  db.findAllRoles()
    .then(([rows]) => {
      let roles = rows;
      console.log("\n");
      console.table(roles);
    })
    .then(() => startPrompt());
}

function viewEmployees() {
  db.findAllEmployees()
    .then(([rows]) => {
      let employees = rows;
      console.log("\n");
      console.table(employees);
    })
    .then(() => startPrompt());
}

function addDepartment() {
  inquirer
    .prompt({
      type: "input",
      message: "What is the name of the department?",
      name: "deptName",
    })
    .then(function (answer) {
      connection.query(
        "INSERT INTO department (name) VALUES (?)",
        [answer.deptName],
        function (err, res) {
          if (err) throw err;
          console.table(res);
          startPrompt();
        }
      );
    });
}

function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What's the name of the role?",
        name: "roleName",
      },
      {
        type: "input",
        message: "What is the salary for this role?",
        name: "salaryTotal",
      },
      {
        type: "input",
        message: "What is the department id number?",
        name: "deptID",
      },
    ])
    .then(function (answer) {
      connection.query(
        "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)",
        [answer.roleName, answer.salaryTotal, answer.deptID],
        function (err, res) {
          if (err) throw err;
          console.table(res);
          startPrompt();
        }
      );
    });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What's the first name of the employee?",
        name: "FirstName",
      },
      {
        type: "input",
        message: "What's the last name of the employee?",
        name: "LastName",
      },
      {
        type: "input",
        message: "What is the employee's role id number?",
        name: "roleID",
      },
      {
        type: "input",
        message: "What is the manager id number?",
        name: "managerID",
      },
    ])
    .then(function (answer) {
      connection.query(
        "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
        [
          answer.eeFirstName,
          answer.eeLastName,
          answer.roleID,
          answer.managerID,
        ],
        function (err, res) {
          if (err) throw err;
          console.table(res);
          startPrompt();
        }
      );
    });
}

function updateEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Which employee would you like to update?",
        name: "employeeUpdate",
      },

      {
        type: "input",
        message: "What do you want to update to?",
        name: "updateRole",
      },
    ])
    .then(function (answer) {
      connection.query(
        "UPDATE employee SET role_id=? WHERE first_name= ?",
        [answer.updateRole, answer.eeUpdate],
        function (err, res) {
          if (err) throw err;
          console.table(res);
          startPrompt();
        }
      );
    });
}

function quit() {
  connection.end();
  process.exit();
}
