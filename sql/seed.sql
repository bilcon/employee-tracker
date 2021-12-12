INSERT INTO department (name)
VALUES ("Sales", "Engineering", "Finance", "Legal");

INSERT INTO role
 (title, salary, department_id)
 VALUES
  ('Sales Lead', 100000, 1),
  ('Lead Engineer', 150000, 2),
  ('Software Engineer', 120000, 2),
  ('Accountant', 125000, 3),
  ('Legal Team Lead', 250000, 4);

INSERT INTO employee
 (first_name, last_name, role_id, manager_id)
Values
  ('Mike', 'Chan', 'Salesperson', 'John Doe'),
  ('Ashley', 'Rodriguez', 'Lead Engineer', "null"),
  ('Kevin', 'Tupik', 'Software Engineer', 'Ashley Rodriguez'),
  ('Kunal', 'Singh', 'Account Manager', 'null'),
  ('Malia', 'Brown', 'Accountant', 'Kunal Singh'),
  ('Sarah', 'Lourd', 'Legal Team Lead', 'null'),
  ('Tom', 'Allen', 'Lawyer', 'Sarah Lourd')
