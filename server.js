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
      name: 'userSelection',
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
    switch(answers.userSelection) {
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

// View all employees in the database
const viewEmployees = () => {

};

// View employees by department
const viewDepartment = () => {

};

// View employees by manager
const viewManager= () => {

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
      name: 'department',
      message: `Please enter the name of their department.`
    },
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
        firstName: answers.firstName,
        lastName: answers.lastName,
        department: answers.department,
        manager: answers.manager,
        id: id
      }
    );
  });
};

// Remove employee form the database
const removeEmployee = () => {

};

// Update an employee's role
const updateRole = () => {

};

// Update an employee's manager
const updateManager = () => {

};

// View the currently created roles
const viewRoles = () => {

};

// Create new title and salary
const addRole = () => {
  return inquirer.prompt([
    // New title input
    {
      type: 'input',
      name: 'newRole',
      message: `Please enter the name of the new title.`
    },
    // New salary input
    {
      type: 'input',
      name: 'newSalary',
      message: `Please enter the salary for this new title.`
    },
  ]).then(function(answers) {
    Connection.query(
      {
        newRole: answers.newRole,
        newSalary: answers.newSalary
      }
    );
  });
};

// Remove a role from the database
const removeRole = () => {

};

// Call the userInterface function when the program initializes
const init = () => {
  userInterface();
};

// Call the init function to start app
init();