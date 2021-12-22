const connection = require("./connection");

class DB {
  constructor(connection) {
    this.connection = connection;
  }
  findAllEmployees() {
    return this.connection.promise().query(
      `SELECT 
        employee.id
        , employee.first_name
        , employee.last_name
        , role.title
        , department.name AS department
        , role.salary,
         CONCAT (manager.first_name, ' ', manager.last_name) AS manager 
         FROM employee 
         LEFT JOIN role on employee.role_id=role.id
         LEFT JOIN department on role.department_id = department.id  
         LEFT JOIN employee manager on manager.id = employee.manager_id;`
    );
  }
  findAllPossibleManagers(employeeId) {
    return this.connection
      .promise()
      .query(
        "SELECT id, first_name, last_name FROM employee WHERE id != ?",
        employeeId
      );
  }

  createEmployee(employee) {
    return this.connection.promise().query(
      `INSERT INTO employee(first_name, last_name, role_id, manager_id) 
      VALUES(?,?,?,?)`,
      employee
    );
  }

  updateEmployeeRole(employeeId, roleId) {
    return this.connection
      .promise()
      .query(`UPDATE employee SET role_id = ? WHERE id = ?`);
  }

  updateEmployeeManager(employeeId, managerId) {
    return this.connection
      .promise()
      .query(`UPDATE employee SET manager_id = ? WHERE id = ?`);
  }

  findAllRoles() {
    return this.connection.promise().query(
      `SELECT role.id, role.title, department.name AS department, role.salary
       FROM role
       LEFT JOIN department on role.department_id = department.id`
    );
  }

  createRole(role) {
    return this.connection
      .promise()
      .query(`INSERT INTO role(title, salary, department_id) VALUES(?,?,?)`);
  }

  findAllDepartments() {
    return this.connection.promise().query("SELECT * FROM department");
  }

  createDepartment(department) {
    return this.connection
      .promise()
      .query(`INSERT INTO department(name) VALUES(?)`);
  }
}

module.exports = new DB(connection);
