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

// Create a new employee and assign them an ID
const employeeQuestions = () => {
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
        id: id
      }
    );
  });
};

// Create new title and salary
const titleQuestions = () => {
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

// Create a new department
const departmentQuestions = () => {
  return inquirer.prompt([
    // New department input
    {
      type: 'input',
      name: 'new_department',
      message: `Please enter the name of the new department.`
    },
    // Department manager input input
    {
      type: 'input',
      name: 'dep_manager',
      message: `Please enter the name of the manager for this department.`
    }
  ]).then(function(answers) {
    Connection.query(
      {
        new_department: answers.new_department,
        dep_manager: answers.dep_manager
      }
    );
  });
};

// begin employeeQuestions
const init = () => {
  employeeQuestions();
};

// call to start app
init();