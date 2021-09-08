// Import and require packages
const inquirer = require('inquirer');
const mysql = require('mysql2');
const consoleTable = require('console.table');
const util = require('util')

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

db.query = util.promisify(db.query);

// Create user interface
const userInterface = async () => {
  const answer = await inquirer.prompt([
    {
      type: 'list',
      message: 'What would you like to do?',
      name: 'userSelection',
      choices: [ 
        'View All Departments',
        'View All Roles',
        'View All Employees',
        'Add Department',
        'Add Role',
        'Add Employee', 
        `Update Employee's Role`,
        'Remove Employee',
        'Remove Role',
        'Remove Department',
        'Exit'
      ]
    }
  // Select function based on user's input
  ]).then(function(answer) {
    switch(answer.userSelection) {
      case 'View All Departments': viewDepartments();
      break;
      case 'View All Roles': viewRoles();
      break;
      case 'View All Employees': viewEmployees();
      break;
      case 'Add Department': addDepartment();
      break;
      case 'Add Role': addRole();
      break;
      case 'Add Employee': addEmployee();
      break;
      case `Update Employees' Role`: updateRole();
      break;
      case 'Remove Employee': removeEmployee(); 
      break;
      case 'Remove Role': removeRole(); 
      break;
      case 'Remove Department': removeDepartment(); 
      break;
      case 'Exit': db.end(); 
      break;
    }
  });
};

// View all employees in the database
const viewEmployees = () => {
  db.query(`SELECT employee.id AS 'ID',
  employee.first_name AS 'First Name', 
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
const viewDepartments = () => {
  db.query(`SELECT department.id AS 'ID', 
  department.name AS Department FROM department`, 
  function(err, res) {
    if(err)throw err;
    console.table('All Departments:', res);
    userInterface();
  })
};

// View the currently created roles
const viewRoles = () => {
  db.query(`SELECT role.id AS 'ID', 
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
const addEmployee = async () => {
  try {
    const employees = await db.query("SELECT * FROM employee");
    const roles = await db.query("SELECT * FROM role");
    const answer = await inquirer.prompt([
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
        type: 'list',
        name: 'selectManager',
        message: `Please select the manager of this employee.`,
        choices: employees.map(employee => ({name:`${employee.first_name} ${employee.last_name}`, value:employee.id})),
      },
      {
        type: 'list',
        name: 'selectRole',
        message: `Please select the role of this employee.`,
        choices: roles.map(role => ({name:role.title, value:role.id}))
      }
    ]).then(function(answer) {
      db.query(`INSERT INTO employee SET ?`, {
        first_name: answer.firstName,
        last_name: answer.lastName,
        manager_id: answer.selectManager,
        role_id: answer.selectRole
      });
      console.log(`${answer.firstName} ${answer.lastName} was added successfully.\n`);
      userInterface();
    });
  } catch (err) {
    console.log(err);
    userInterface();
  };
};

// Add a department
const addDepartment = async () => {
  try {
    const answer = await inquirer.prompt([
      {
        type: 'input',
        name: 'newDepartment',
        message: `Please enter the name of the new department.`
      }
    ]).then(function(answer) {
      db.query('INSERT INTO department SET ?', {name: answer.newDepartment});
      console.log(`${answer.newDepartment} was added successfully.\n`);
      userInterface();
    });
  } catch (err) {
    console.log(err);
    userInterface();
  };
  
};

// Add a new role to existing department
const addRole = async () => {
  try {
    const departments = await db.query("SELECT * FROM department")
    const answer = await inquirer.prompt([
      {
        type: 'input',
        name: 'newRole',
        message: 'Please enter the name of the new title.'
      },
      {
        type: 'input',
        name: 'newSalary',
        message: 'Please enter the salary for this new title.'
      },
      {
        type: 'list',
        name: 'inDepartment',
        message: 'Please select the corresponding department for this role.',
        choices: departments.map((department => ({name:`${department.name}`, value:department.id})))
      }
    ]).then(function(answer) {
      db.query("INSERT INTO role SET ?", {
        title: answer.newRole,
        salary: answer.newSalary,
        department_id: answer.inDepartment
      });
      console.log(`${answer.newRole} was added successfully.\n`);
      userInterface();
    });
  } catch (err) {
    console.log(err);
    userInterface();
  };
};

// Update an employee's role
const updateRole = async () => {
  try {
    const employees = await db.query("SELECT * FROM employee");
    const employeeAnswer = await inquirer.prompt([
      {
        type: 'list',
        name: 'selectEmployee',
        message: `Which employee's role do you want to update?`,
        choices: employees.map(employee => {
          return {
            name:`${employee.first_name} ${employee.last_name}`,
            value:employee.id
          }
        })
      }
    ]);
    const roles = await db.query("SELECT * FROM role");
    const roleAnswer = await inquirer.prompt([
      {
        type: 'list',
        name: 'updatedRole',
        message: `What role do you want to assign the selected employee?`,
        choices: roles.map(role => {
          return {
            name:`${role.title}`,
            value:role.id
          }
        })
      }
    ]).then(function(answer) {
      db.query(`UPDATE employee SET role_id = ? WHERE id = ?`, [
        employeeAnswer.selectEmployee,
        roleAnswer.updatedRole
      ]);
      console.log(`${answer.selectEmployee} was updated successfully.\n`);
      userInterface();
    });
  } catch (err) {
      console.log(err);
      userInterface();
  };
};

// Remove employee form the database
const removeEmployee = async () => {
  try {
    const employees = await db.query("SELECT * FROM employee");
    const answer = await inquirer.prompt([
      {
        type: 'list',
        name: 'removeEmployee',
        message: `Which employee's role do you want to update?`,
        choices: employees.map(employee => ({name:`${employee.first_name} ${employee.last_name}`, value:employee.id})),
      }
    ]).then(function(answer) {
      db.query('DELETE FROM employee WHERE ?', {id: answer.removeEmployee});
      console.log(`${answer.removeEmployee} was deleted successfully.\n`);
      userInterface();
    });
  } catch (err) {
  console.log(err);
  userInterface();
  };
};

// Remove role form the database
const removeRole = async () => {
  try {
    const roles = await db.query("SELECT * FROM role");
    const answer = await inquirer.prompt([
      {
        type: 'list',
        name: 'removeRole',
        message: `Please select the role you want to delete.`,
        choices: roles.map(role => ({name:`${role.title}`, value:role.id})),
      }
    ]).then(function(answer) {
      db.query('DELETE FROM role WHERE ?', {id: answer.removeRole});
      console.log(`${answer.removeRole} was deleted successfully.\n`);
      userInterface();
    });
  } catch (err) {
  console.log(err);
  userInterface();
  };
};

// Remove department form the database
const removeDepartment = async () => {
  try {
    const departments = await db.query("SELECT * FROM department");
    const answer = await inquirer.prompt([
      {
        type: 'list',
        name: 'removeDepartment',
        message: `Please select the department you want to delete.`,
        choices: departments.map(department => ({name:`${department.name}`, value:department.id})),
      }
    ]).then(function(answer) {
      db.query('DELETE FROM department WHERE ?', {id: answer.removeDepartment});
      console.log(`${answer.removeDepartment} was deleted successfully.\n`);
      userInterface();
    });
  } catch (err) {
  console.log(err);
  userInterface();
  };
};

// Call the userInterface function when the program initializes
const init = () => {
  userInterface();
};

// Call the init function to start app
init();