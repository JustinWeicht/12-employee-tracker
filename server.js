// Import and require packages
const fs = require('fs');
const inquirer = require('inquirer');
const express = require('express');
const mysql = require('mysql2');
const Connection = require('mysql2/typings/mysql/lib/Connection');

// Set the port number
const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
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
      name: 'user_selection',
      choices: [
        'View All Employees',
        'View All Employees By Department', 
        'View All Employees By Manager', 
        'Add Employee', 
        'Remove Employee', 
        'Update Employee Role',
        'Update Employee Manger',
        'View All roles',
        'Add Role',
        'Remove Role'
      ]
    }
  // Select function based on user's input
  ]).then(function(answers) {
    switch(answers.user_selection) {
      case 'View All Employees': viewEmployees();
      break;
      case 'View All Employees By Department': viewDepartment(); 
      break;
      case 'View All Employees By Manager': viewManager();
      break;
      case 'Add Employee': addEmployee();
      break;
      case 'Remove Employee': removeEmployee(); 
      break;
      case 'Update Employee Role': updateRole();
      break;
      case 'Update Employee Manger': updateManager();
      break;
      case 'View All roles': viewRoles();
      break;
      case 'Add Role': addRole();
      break;
      case 'Remove Role': removeRole();
      break;
    }
  });
};

// Create a new employee and assign them an ID
const addEmployee = () => {
  return inquirer.prompt([
    // First name input
    {
      type: 'input',
      name: 'first_name',
      message: `Please enter this employee's first name.`
    },
    // Last name input
    {
      type: 'input',
      name: 'last_name',
      message: `Please enter this employee's last name.`
    },
    {
      type: 'input',
      name: 'department',
      message: `Please enter the name of their department.`
    },
    // Department manager input
    {
      type: 'input',
      name: 'manager',
      message: `Please enter the name of their manager.`
    }
  // Assign ID to new employee
  ]).then(function(answers) {
    let id;
    for (let i = 0; i < res.length; i++) {
      if (res[a].title == answers.role) {
        id = res[a].id;
        console.log(id);
      }
    }
    Connection.query(
      {
        first_name: answers.first_name,
        last_name: answers.last_name,
        department: answers.department,
        manager: answers.manager,
        id: id
      }
    );
  });
};

// Create new title and salary
const addRole = () => {
  return inquirer.prompt([
    // New title input
    {
      type: 'input',
      name: 'new_title',
      message: `Please enter the name of the new title.`
    },
    // New salary input
    {
      type: 'input',
      name: 'new_salary',
      message: `Please enter the salary for this new title.`
    },
  ]).then(function(answers) {
    Connection.query(
      {
        new_title: answers.new_title,
        new_salary: answers.new_salary
      }
    );
  });
};

// begin employeeQuestions
const init = () => {
  userInterface();
};

// call to start app
init();