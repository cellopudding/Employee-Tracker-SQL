use employees_db;

INSERT INTO department (department_name)
VALUES ("Human Resources"),
       ("Accounting"),
       ("Sales"),
       ("IT"),
       ("Engineering");

INSERT INTO roll (title, salary, department_id)
       ("Happiness Helper", 50000.00, 3),
       ("Accountant", 75000.00, 1),
       ("Salesman", 60000.00, 4),
       ("Developer", 100000.00, 2),
       ("Engineer", 90000.00, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
       ("Jeff", "Stone", 6, 3),
       ("Amanda", "Robinson", 4, 1),
       ("Mike", "Chlala", 2, 4),
       ("Drew", "Clover", 1, 7),
       ("Ashley", "Mathias", 3, 2);