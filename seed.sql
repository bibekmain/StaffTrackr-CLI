USE employee_db;

INSERT INTO department (name)
VALUES  ("Management"),
        ("Sales"),
        ("Production");

INSERT INTO role (title, salary, department_id)
VALUES  ("Branch Manager", 85000, 1),
        ("Salesman", 60000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("Michael", "Scott", 1, null),
        ("Jim", "Halpert", 2, 1),
        ("Dwight", "Schrute", 2, 1);
