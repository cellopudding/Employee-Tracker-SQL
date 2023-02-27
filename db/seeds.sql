use employees_db;

INSERT INTO department(department_name)
VALUES ("Human Resources"), ("Accounting"), ("Sales"), ("Tech"), ("Engineering");

-- Adding role data
INSERT INTO role(title, salary, department_id)
VALUES ("Happiness Helper",120000, 1),
    ("Accountant",75000, 1),
    ("Salesman",125000, 2),
    ("Developer",90000, 3),
    ("Engineer",180000, 4);


-- Adding employee data
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Reid", "Stone", 1, null),
    ("Amanda", "Rogers", 3, null),
    ("Mike", "Chlala", 5, 2),
    ("Drew", "Clover", 2, 3),
    ("Ashley", "Mathias", 3, 3);
