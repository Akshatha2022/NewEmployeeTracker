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

function userPrompt() {
  inquirer
    .prompt({
      type: "list",
      name: "select",
      message: "What would you like to do?",
      choices: [
        "View All Employees",
        "View All Roles",
        "View All Departments",
        "Add Employee",
        "Add Role",
        "Add Department",
        "Update Employee Role",
        "Exit",
      ],
    })
    .then(function ({ select }) {
      switch (select) {
        case "View All Employees":
          viewAllEmployees();
          break;

        case "Add Employee":
          addEmployees();
          break;

        case "Update Employee Role":
          updateEmployeeRole();
          break;

        case "View all Roles":
          viewAllRoles();
          break;

        case "Add Role":
          addRole();
          break;

        case "View all Departments":
          viewAllDepartments();
          break;

          case "Add Department":
            addDepartment();
            break;

        case "Quit":
          connection.quit();
          break;
      }
    });
}

function viewAllEmployees() {
  console.log("Viewing All employees");

  let select =
    `SELECT employee.id, 
    employee.first_name, 
    employee.last_name, 
    role.title, 
    department.name AS department, 
    role.salary, 
    CONCAT(m.first_name, ' ', m.last_name) 
    AS manager
  FROM employee employee
  LEFT JOIN role role
	ON employee.role_id = role.id
  LEFT JOIN department d
  ON department.id = role.department_id
  LEFT JOIN employee manager
	ON manager.id = employee.manager_id`

  connection.query(select, function (err, res) {
    if (err) throw err;

    console.table(res);
    console.log("All Employees viewed!");
    userPrompt();
  });
};

// // Create a movie
// app.post('/api/new-movie', ({ body }, res) => {
//   const sql = `INSERT INTO movies (movie_name)
//     VALUES (?)`;
//   const params = [body.movie_name];
  
//   db.query(sql, params, (err, result) => {
//     if (err) {
//       res.status(400).json({ error: err.message });
//       return;
//     }
//     res.json({
//       message: 'success',
//       data: body
//     });
//   });
// });

// // Read all movies
// app.get('/api/movies', (req, res) => {
//   const sql = `SELECT id, movie_name AS title FROM movies`;
  
//   db.query(sql, (err, rows) => {
//     if (err) {
//       res.status(500).json({ error: err.message });
//        return;
//     }
//     res.json({
//       message: 'success',
//       data: rows
//     });
//   });
// });

// // Delete a movie
// app.delete('/api/movie/:id', (req, res) => {
//   const sql = `DELETE FROM movies WHERE id = ?`;
//   const params = [req.params.id];
  
//   db.query(sql, params, (err, result) => {
//     if (err) {
//       res.statusMessage(400).json({ error: res.message });
//     } else if (!result.affectedRows) {
//       res.json({
//       message: 'Movie not found'
//       });
//     } else {
//       res.json({
//         message: 'deleted',
//         changes: result.affectedRows,
//         id: req.params.id
//       });
//     }
//   });
// });

// // Read list of all reviews and associated movie name using LEFT JOIN
// app.get('/api/movie-reviews', (req, res) => {
//   const sql = `SELECT movies.movie_name AS movie, reviews.review FROM reviews LEFT JOIN movies ON reviews.movie_id = movies.id ORDER BY movies.movie_name;`;
//   db.query(sql, (err, rows) => {
//     if (err) {
//       res.status(500).json({ error: err.message });
//       return;
//     }
//     res.json({
//       message: 'success',
//       data: rows
//     });
//   });
// });

// // BONUS: Update review name
// app.put('/api/review/:id', (req, res) => {
//   const sql = `UPDATE reviews SET review = ? WHERE id = ?`;
//   const params = [req.body.review, req.params.id];

//   db.query(sql, params, (err, result) => {
//     if (err) {
//       res.status(400).json({ error: err.message });
//     } else if (!result.affectedRows) {
//       res.json({
//         message: 'Movie not found'
//       });
//     } else {
//       res.json({
//         message: 'success',
//         data: req.body,
//         changes: result.affectedRows
//       });
//     }
//   });
// });

// // Default response for any other request (Not Found)
// app.use((req, res) => {
//   res.status(404).end();
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
