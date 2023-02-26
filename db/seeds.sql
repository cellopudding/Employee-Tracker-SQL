use employees_db;

INSERT INTO department(department_name)
VALUES ("Operations"), ("Marketing"), ("Sales"), ("Legal"), ("Tech");

-- Adding role data
INSERT INTO role(title, salary, department_id)
VALUES ("Operations Manager",120000, 1),
    ("Associate",75000, 1),
    ("Marketing Manager",125000, 2),
    ("Salesman",90000, 3),
    ("Lawyer",180000, 4),
    ("Developer",135000, 5),
    ("Intern",85000, 5),
    ("DevOps",120000, 5);

-- Adding employee data
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Rufus", "Humphry", 1, null),
    ("Lily", "VanDerWoodsen", 3, null),
    ("Nate", "Archabald", 5, 2),
    ("Blair", "Waldorf", 2, 3),
    ("Serena", "VanDerWoodsen", 3, 3),
    ("Dan", "Humphry", 4, 3);

-- use employees_db;

-- INSERT INTO department (department_name)
-- VALUES ("Human Resources"),
--        ("Accounting"),
--        ("Sales"),
--        ("IT"),
--        ("Engineering");

-- INSERT INTO role (title, salary, department_id)
-- vALUES ("Happiness Helper", 50000.00, 1),
--        ("Accountant", 75000, 1),
--        ("Salesman", 60000, 4),
--        ("Developer", 100000, 2),
--        ("Engineer", 90000, 5);

-- INSERT INTO employee (first_name, last_name, role_id, manager_id)
-- VALUES  ("Jeff", "Stone", 4, 3),
--        ("Amanda", "Robinson", 4, 1),
--        ("Mike", "Chlala", 2, 4),
--        ("Drew", "Clover", 1, 3),
--        ("Ashley", "Mathias", 3, 2);
