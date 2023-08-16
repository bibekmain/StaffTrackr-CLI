USE employee_db;

INSERT INTO department (name)
VALUES  ("Sales"),
        ("Production");

INSERT INTO role (title, salary, department_id)
VALUES  ("Web Developer", 100000, 2),
        ("Salesman", 70000, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES  ("Jim", "Halpert", 2, 2),
        ("Dwight", "Schrute", 2, 2);
