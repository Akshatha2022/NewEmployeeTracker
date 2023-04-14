const express = require('express');
// Import and require mysql2
const mysql = require('mysql2');
const inquirer = require('inquirer');
//cTable = require('console.table');

// const PORT = process.env.PORT || 3001;

// const PORT = process.env.PORT || 3001;
// const app = express();

// Express middleware
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());

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


function menu(option) {
  switch (option) {
    case 'viewEmployees':
      viewAllEmployees();
      break;
      case 'viewDepartments':
        viewAllDepartments();
        break;
        case 'viewRoles':
        viewAllRoles();
        break;
        case 'addEmployee':
        addEmployee();
        break;
        case 'deleteEmployee':
        deleteEmployee();
        break;
        case 'addDepartment':
        addDepartment();
        break;
        case 'addRole':
        addRole();
        break;
        case 'updateRole':
        updateRole();
        break;
        case 'exit':
        exit();
      }
    };


    // view all employees prompt
    function viewAllEmployees() {
      connection.query(`SELECT employee.id, employee.first_name AS 'First Name', 
      employee.last_name AS 'Last Name', role.title AS Title, department.name AS Department,
      role.salary AS Salary, CONCAT(manager.first_name, ' ', manager.last_name) AS Manager
      FROM employee 
      JOIN role on employee.role_id = role.id
      JOIN department on role.department_id = department.id
      LEFT JOIN employee manager on manager.id = employee.manager_id
      ORDER BY employee.last_name;`, function (error, res) {
        console.table(res);
        endMenu();
      })
    };

          // function to: view all the departments
          function viewAllDepartments() {
            console.log("view all departments")
            connection.query("SELECT * from department", function (error, res) {
              console.table(res);
              endMenu();
            })
          };