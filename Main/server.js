const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');
const inquirer = require('inquirer');
//const cTable = require('console.table');

// const PORT = process.env.PORT || 3001;

// const PORT = process.env.PORT || 3001;
// const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Connect to database
require("dotenv").config();
//console.log (process.env.DB_PASSWORD)
const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: process.env.DB_PASSWORD,
  database: "employee_db"
});

let showroles;
let showdepartments;
let showemployees;

connection.connect(function (err) {
  if (err) {
    return;
  }

  connection.query("SELECT * from role", function (error, res) {
    showroles = res.map(role => ({ 
      name: role.title, 
      value: role.id 
    }))
  });
});

connection.query("SELECT * from department", function (error, res) {
  showdepartments = res.map(dep => ({ 
    name: dep.name, 
    value: dep.id 
  }))
});

connection.query("SELECT * from employee", function (error, res) {
  showemployees = res.map(emp => ({ 
    name: `${emp.first_name} ${emp.last_name}, 
    id: ${emp.id}`, value: emp.id 
  }))
});

showprompt();

function showprompt() {
  inquirer

.prompt(
  {
    type: "list",
    message: "Employee Tracking App",
    name: "choices",
    choices: [
      {
        name: "View all employees",
        value: "viewEmployees"
      },
      {
        name: "View all departments",
        value: "viewDepartments"
      },
      {
        name: "View all roles",
        value: "viewRoles"
      },
      {
        name: "Add employee",
        value: "addEmployee"
      },
      {
        name: "Delete employee",
        value: "deleteEmployee"
      },
      {
        name: "Add department",
        value: "addDept"
      },
      {
        name: "Add role",
        value: "addRole"
      },
      {
        name: "Update role",
        value: "updateRole"
      },
      {
        name: "Exit",
        value: "Exit"
      }
    ]
  }).then(function (res) {
    menu(res.choices)
  })
};
