USE employee_tracker;

INSERT INTO department(name)
VALUES   
    ('Sales'),
    ('Human Resource'),
    ('Information Technology');

INSERT INTO role(title, salary, department_id)
VALUES   
    ('Sales Representative', 50000, 1),
    ('Marketing Lead', 60000, 1),
    ('Generalist', 70000, 2),
    ('Director', 80000, 2),
    ('Engineer', 80000, 3);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES
    ('Justin', 'Weicht', 5, null),
    ('John', 'Doe', 4, 5),
    ('Some', 'Body', 3, 4),
    ('Dexter', 'Dog', 2, 3),
    ('Tigger', 'Cat', 1, 2);
