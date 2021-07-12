// Import and require packages
const fs = require('fs');
const inquirer = require('inquirer');
const express = require('express');
const mysql = require('mysql2');

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

const newQuestions = () => {
    return inquirer.prompt([

        // First name section
        {
            type: 'input',
            name: 'first_name',
            message: `Please enter this employee's first name.`
        },
        // Last name section
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
    })

    // send data to generateMarkdown.js
    .then(data => {
        return generateMarkdown(data);
    })

    // name the file to README.md
    .then(generatedReadme => {
        return writeToFile('README.md', generatedReadme);
    })
    
    // log error is any occur
    .catch(err => {
        console.log(err);
    })
};

// write readme file into ./generated folder
const writeToFile = (fileName, data) => {
    fs.writeFile(`./generated/${fileName}`, data, err => {
        if (err) {
            throw err;
        } else {
            console.log('Your README.md file has been generated.')
        }
    });
};

// begin newQuestions
const init = () => {
    newQuestions();
};

// call to start app
init();