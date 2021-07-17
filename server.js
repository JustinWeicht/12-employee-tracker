// Import and require packages
const inquirer = require('inquirer');
const mysql = require('mysql2');
const consoleTable = require('console.table');

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    port: 3306,
    // ENTER MySQL USERNAME HERE!
    user: 'root',
    // ENTER MySQL PASSWORD HERE!
    password: 'september',
    database: 'employee_tracker'
  },
  console.log(`Connected to the employee_tracker database.`)
);

// Create user interface
const userInterface = () => {
  return inquirer.prompt([
    // Interface options
    {
      type: 'list',
      message: 'What would you like to do?',
      name: 'userSelection',
      choices: [ 
        'View All Employees',
        'View All Departments',
        'View All Roles',
        'Add Employee', 
        'Add Department',
        'Add Role',
        'Update Employee Role',
        'Remove Employee'
      ]
    }
  // Select function based on user's input
  ]).then(function(answers) {
    switch(answers.userSelection) {
      case 'View All Employees': viewEmployees();
      break;
      case 'View All Departments': viewDepartments();
      break;
      case 'View All Roles': viewRoles();
      break;
      case 'Add Employee': addEmployee();
      break;
      case 'Add Department': addDepartment();
      break;
      case 'Add Role': addRole();
      break;
      case 'Update Employee Role': updateRole();
      break;
      case 'Remove Employee': removeEmployee(); 
      break;
    }
  });
};

// Function calls from userInterface
// View all employees in the database
const viewEmployees = () => {
  db.query(`SELECT employee.first_name AS 'First Name', 
  employee.last_name AS 'Last Name', 
  role.title AS Title, role.salary AS Salary, 
  department.name AS Department, 
  CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee 
  INNER JOIN role on role.id = employee.role_id 
  INNER JOIN department on department.id = role.department_id 
  LEFT JOIN employee e on employee.manager_id = e.id;`, 
  function(err, res) {
    if(err)throw err;
    console.table('All Employees:', res);
    userInterface();
  })
};

// View employees by department
// TODO: ADD COMBINED SALARIES OF SELECTED DEPARTMENT
const viewDepartments = () => {
  db.query(`SELECT department.id, 
  department.name AS Department FROM department`, 
  function(err, res) {
    if(err)throw err;
    console.table('All Departments:', res);
    userInterface();
  })
};

// View the currently created roles
const viewRoles = () => {
  db.query(`SELECT role.id, 
  role.title AS Title, 
  role.salary AS Salary, 
  department.name AS Department FROM role 
  INNER JOIN department on department.id = role.department_id`, 
  function(err, res){
    if (err) throw err;
    console.table('All Roles:', res);
    userInterface();
  });
};

// Create a new employee and assign them an ID
const addEmployee = () => {
  return inquirer.prompt([
    // Employee form section
    {
      type: 'input',
      name: 'firstName',
      message: `Please enter this employee's first name.`
    },
    {
      type: 'input',
      name: 'lastName',
      message: `Please enter this employee's last name.`
    },
    {
      type: 'input',
      name: 'mangerId',
      message: managerChoices()
    },
    {
      type: 'list',
      name: 'role',
      message: `Please select the title of this employee.`,
      choices: roleChoices()
    }
  // Assign ID to new employee
  ]).then(function(answers) {
    db.query(
      'INSERT INTO employee SET ?', 
      {
        first_name: answers.firstName,
        last_name: answers.lastName,
        manager_id: answers.managerId,
        role_id: roleId()
      }
    );
    userInterface();
  });
  
};

// Create new title and salary
const addRole = () => {
  return inquirer.prompt([
    // New title input
    {
      type: 'input',
      name: 'newTitle',
      message: `Please enter the name of the new title.`
    },
    // New salary input
    {
      type: 'input',
      name: 'newSalary',
      message: `Please enter the salary for this new title.`
    },
    // Department input
    {
      type: 'list',
      name: 'inDepartment',
      message: `Please select which department this new role belongs to.`,
      choices: departmentChoices()
    },
  ]).then(function(answers) {
    db.query(
      'INSERT INTO role SET ?',
      {
        title: answers.newRole,
        salary: answers.newSalary
      }
    );
    userInterface();
  });
};

const addDepartment = () => {
  return inquirer.prompt([
    // Employee form section
    {
      type: 'input',
      name: 'newDepartment',
      message: `Please enter the name of the new department.`
    }
  // Assign ID to new employee
  ]).then(function(answers) {
    db.query(
      'INSERT INTO department SET ?', 
      {
        name: answers.newDepartment
      }
    );
    userInterface();
  });
};

// Update an employee's role
const updateRole = () => {

};


// Remove employee form the database
const removeEmployee = () => {

};

// Call the userInterface function when the program initializes
const init = () => {
  userInterface();
};

// Call the init function to start app
init();