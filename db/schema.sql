DROP DATABASE IF EXISTS employeesDB;
CREATE DATABASE employeesDB;

USE employeesDB;

CREATE TABLE department (
  id INTEGER UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  department_name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
  id INTEGER UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) NULL,
  salary DECIMAL NULL,
  department_id INTEGER UNSIGNED NULL,
  INDEX dep_ind(department_id),
  CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id) ON DELETE CASCADE
);

CREATE TABLE employee (
  id INTEGER UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NULL,
  last_name VARCHAR(30) NULL,
  role_id INTEGER UNSIGNED NULL,
  INDEX role_ind(role_id),
  CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role(id) ON DELETE CASCADE,
  manager_id INTEGER UNSIGNED NULL,
  INDEX manager_id(manager_id),
  CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES manager(id) ON DELETE CASCADE,
);