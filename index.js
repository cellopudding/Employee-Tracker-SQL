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
letsBegin()
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
function addDepartment() {
  inquirer.prompt([
    {
      name: "department_name",
      message: "What department would you like to add?"
    }
  ])
  .then(results => {
    let departmentName = results
    db.promise().query("INSERT INTO department SET ?", departmentName)
    .then(()=> console.log(`added ${departmentName.department_name}`))
    .then(()=> letsBegin())
  })
}




// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
function addRole() {
  db.query(`SELECT * FROM role`, function(err, results){
    let department = results
    const departmentChoices = department.map(({id, name}) => ({
      name: name,
      value: id
    }))
  
  inquirer.prompt([
      {
        type: "input",
        message: "What is the role name?",
        name: "title"
      },
      {
        type: "input",
        message: "What is the salary for this role?",
        name: "salary"
      },
      {
        type: "input",
        message: "What is the department id number?",
        name: "department_id",
        choices: departmentChoices
      }
    ])
  
  .then(answer => {
    db.promise().query("INSERT INTO role SET ?", answer)
    .then(()=> console.log(`added ${answer.title}`))
    .then(()=> letsBegin())
  }) 
  
})
}


// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
function addEmployee() {
  inquirer.prompt([
    {
      type: "input",
      message: "What is the employees first name?",
      name: "first_name"
    },
    {
      type: "input",
      message: "What is the employees last name?",
      name: "last_name"
    }
  ])

  .then(results => {
    let firstName = results.first_name
    let lastName = results.last_name
  
    db.promise().query("SELECT role.id, role.title, department.id AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;")
    .then(([rows])=> {
      let roles = rows
      const roleChoices = roles.map(({id, title})=> ({
        name: title,
        value: id
    
      }))
      inquirer.prompt({
        type: "list",
        name: "role_id",
        message: "What is the employees role?",
        choices: roleChoices
      })
      .then(results => {
        let roleId = results.role_id
        db.promise().query(`SELECT * FROM employee`)
        .then(([rows])=> {
          let employees = rows
          const managerChoices = employees.map(({id, first_name, last_name}) => ({
            name: `${first_name}${last_name}`, 
            value: id
          }))
          managerChoices.unshift({
            name: "none",
            value: null
          })
          inquirer.prompt({
            type: "list",
            name: "managerId",
            message: "Who is the employee's manager?",
            choices: managerChoices
          })
          
            .then(res => {
              console.log(res)
              let employee = {
                manager_id: res.managerId,
                role_id: roleId,
                first_name: firstName,
                last_name: lastName
              }
db.promise().query("INSERT INTO employee (manager_id, role_id, first_name, last_name) VALUES (?, ?, ?, ?)", employee.manager_id, employee.role_id, employee.first_name, employee.last_name)

        })
        .then(() => console.log(
          `Added ${firstName} ${lastName} to the database`
          
        ))
        .then(() => letsBegin())
        
      })
    
    })
  
  })
  
  })
}

// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database

