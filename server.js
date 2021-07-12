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
    // ENTER MySQL PASSWORD HERE
    password: 'september',
    database: 'employee_tracker'
  },
  console.log(`Connected to the employee_tracker database.`)
);

// 
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
    )
  })
};

// 
const departmentQuestions = () => {
  return inquirer.prompt([
    // New department input
    {
      type: 'input',
      name: 'new_department',
      message: `Please enter the name of the new department.`
    }
  ]).then(function(answers) {
    Connection.query(
      {
        new_department: answers.new_department
      }
    )
  })
}

// begin employeeQuestions
const init = () => {
    employeeQuestions();
};

// call to start app
init();