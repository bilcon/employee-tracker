use employeesdb;

INSERT INTO department
    (name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Sales Lead', 100000, 1),
    ('Salesperson', 80000, 1),
    ('Lead Engineer', 150000, 2),
    ('Software Engineer', 120000, 2),
    ('Account Manager', 160000, 3),
    ('Accountant', 125000, 3),
    ('Legal Team Lead', 250000, 4),
    ('Lawyer', 190000, 4);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('John', 'Doe', 1, NULL),
    ('Mike', 'Chan', 2, 1),
    ('Ashley', 'Rodriguez', 3, NULL),
    ('Kevin', 'Tupik', 4, 3),
    ('Kunal', 'Singh', 5, NULL),
    ('Malia', 'Brown', 6, 5),
    ('Sarah', 'Lourd', 7, NULL),
    ('Tom', 'Allen', 8, 7),
    ('Ronald', 'Firbank', 1, 1),
    ('Virginia', 'Woolf', 1, 1),
    ('Piers', 'Gaveston', 1, 3),
    ('Charles', 'LeRoi', 2, 1),
    ('Katherine', 'Mansfield', 2, 1),
    ('Dora', 'Carrington', 3, 5),
    ('Edward', 'Bellamy', 3, 4),
    ('Montague', 'Summers', 3, 1),
    ('Octavia', 'Butler', 3, 1),
    ('Unica', 'Zurn', 2, 1);