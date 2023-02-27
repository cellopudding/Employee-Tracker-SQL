const fs = require('fs');
const path = require('path')
const inquirer = require('inquirer');
const mysql = require('mysql2');
const PORT = process.env.PORT || 3001;
var figlet = require('figlet');



// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'employees_db'
  },
  console.log(figlet.textSync('Employee Tracker', {
    font: 'Standard',
    horizontalLayout: 'default',
    verticalLayout: 'default',
    width: 80,
    whitespaceBreak: true
  })))



//LETS BEGIN


function letsBegin() {

  inquirer.prompt({
      
      type: "list",
      choices: [
        "view all departments",
        "view all roles",
        "view all employees",
        "add a department",
        "add a role",
        "add an employee",
        "update an employee role",
        "Quit"
      ],
      message: "What would you like to do?",
      name: "choice"
    })
  .then(function(result) {
      console.log("You entered: " + result.choice);

      switch (result.choice) {
        case "view all departments":
          viewDepartments();
          break;
        case "view all roles":
          viewRoles();
          break;
        case "view all employees":
          viewEmployees();
          break;
        case "add a department":
          addDepartment();
          break;
        case "add a role":
          addRole();
          break;
        case "add an employee":
          addEmployee();
          break;
        case "update employee role":
          updateEmployee();
          break;
        default:
          quit();
      }
    })
}

// WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids
letsBegin();
const viewDepartments = ()=> {
  db.query(`SELECT * FROM department`, function(err, results){
    console.log(`\n`)
    console.table(results)
    letsBegin()//SHOULD I DO THIS EACH TIME OR IS THERE A BETTER WAY!!!!???
  })
}


// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
const viewRoles = ()=> {
  db.query(`SELECT * FROM role`, function(err, results){
    console.log(`\n`)
    console.table(results)
    letsBegin()
    
  })
}


// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, 
// last names, job titles, departments, salaries, and managers that the employees report to
const viewEmployees = ()=> {
  db.query(`SELECT * FROM employee`, function(err, results){
    console.log(`\n`)
    console.table(results)
    letsBegin()
  })
}


// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database






// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
function addRole() {
  inquirer.prompt([
      {
        type: "input",
        message: "What is the role name?",
        name: "whatRole"
      },
      {
        type: "input",
        message: "What is the salary for this role?",
        name: "whatSalary"
      },
      {
        type: "input",
        message: "What is the department id number?",
        name: "whatDept"
      }
    ])
  .then(function(answer) {
  db.query("INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)", [answer.whatRole, answer.whatSalary, answer.whatDept], function(err, results) {
        // if (err) throw err
        console.table(results)
        letsBegin()
      })
    })
}


// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database







// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database 