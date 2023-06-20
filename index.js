const inquirer = require("inquirer");
const connection = require("./db/connection.js");
require("console.table");

const mainMenu = () => {
    // http://www.figlet.org/fonts/big.flf
    // http://www.figlet.org/fontdb_example.cgi?font=big.flf
    console.log(`============Employee🖇Tracker=============`);
    inquirer
      .prompt({
        name: "start",
        type: "list",
        message: "What would you like to do",
        choices: [
          "View All Employees", 
          "View All Employees By Department", 
          "View All Employees By Manager", 
          "Add Employee", 
          "Remove Employee", 
          "Update Employee Role", 
          "Update Employee Manager", 
          "View All Roles", 
          "Add Role", 
          "Remove Role", 
          "View All Departments", 
          "Add Department", 
          "Remove Department", 
          "View Total Utilized Budget of a Department", 
          "Exit", 
        ],
      })
      .then((answer) => {
        // console.log(answer);
        switch (answer.start) {
          case "View All Employees":
            ViewAllEmployees();
            break;
  
          case "View All Employees By Department":
            ViewAllEmployeesByDepartment();
            break;
  
          case "View All Employees By Manager":
            ViewAllEmployeesByManager();
            break;
  
          case "Add Employee":
            AddEmployee();
            break;
  
          case "Remove Employee":
            RemoveEmployee();
            break;
  
          case "Update Employee Role":
            UpdateEmployeeRole();
            break;
  
          case "Update Employee Manager":
            UpdateEmployeeManager();
            break;
  
          case "View All Roles":
            ViewAllRoles();
            break;
  
          case "Add Role":
            AddRole();
            break;
  
          case "Remove Role":
            RemoveRole();
            break;
  
          case "View All Departments":
            ViewAllDepartments();
            break;
  
          case "Add Department":
            AddDepartment();
            break;
  
          case "Remove Department":
            RemoveDepartment();
            break;
  
          case "View Total Utilized Budget of a Department":
            ViewTotalUtilizedBudgetByDepartment();
            break;
  
          case "Exit":
            Exit();
            break;
        }
      });
  };

  function ViewAllEmployees() {
    // all ees: id, first name, last name, title, department, salary, manager
    const query = `SELECT 
    employee.id, 
    employee.first_name, 
    employee.last_name, 
    role.title, 
    department.name AS 
    department, 
    role.salary, 
    CONCAT(manager.first_name, ' ', manager.last_name) AS 
    manager FROM 
    employee 
    LEFT JOIN role ON 
    employee.role_id = role.id 
    LEFT JOIN department ON 
    role.department_id = department.id 
    LEFT JOIN employee manager ON 
    manager.id = employee.manager_id;`;
    // show result in the terminal by console.table
    connection.query(query, (err, data) => {
      if (err) throw err;
      console.table(data);
      mainMenu();
    });
  }
  
  function ViewAllEmployeesByDepartment() {
    // department: marketing, accounting, engineering, human resources, legal
    // -- another inquire prompt needed for department selection display
    inquirer
      .prompt({
        name: "department",
        type: "list",
        message: "Which department would you like to view?",
        choices: [
          "Marketing",
          "Accounting",
          "Engineering",
          "Human Resources",
          "Legal",
        ],
      })
      .then((answer) => {
        // console.log(answer);
        switch (answer.department) {
          case "Marketing":
            return myViewEmployeesByDepartment("Marketing");
          case "Accounting":
            return myViewEmployeesByDepartment("Accounting");
          case "Engineering":
            return myViewEmployeesByDepartment("Engineering");
          case "Human Resources":
            return myViewEmployeesByDepartment("Human Resources");
          case "Legal":
            return myViewEmployeesByDepartment("Legal");
        }
      });
      function myViewEmployeesByDepartment(department) {
        const query = `
         SELECT employee.id, 
         employee.first_name, 
         employee.last_name, 
         role.title, 
         department.name AS department 
         FROM employee 
         LEFT JOIN role ON employee.role_id = role.id 
         LEFT JOIN department ON role.department_id = department.id 
         WHERE department.name = ?;`;
        connection.query(query, department, (err, data) => {
          if (err) throw err;
          console.table(data);
          mainMenu();
        });
      }
    }
    function ViewAllEmployeesByManager() {
        // display a list includes all managers: first name, last name
        const query = `SELECT 
         employee.id, 
         employee.first_name, 
         employee.last_name, 
         role.title, 
         department.name AS 
         department, 
         CONCAT(manager.first_name, ' ', manager.last_name) AS manager 
         FROM employee 
         LEFT JOIN role ON employee.role_id = role.id 
         LEFT JOIN department ON role.department_id = department.id 
         LEFT JOIN employee manager ON manager.id = employee.manager_id 
         ORDER BY manager;`;
        connection.query(query, (err, data) => {
          if (err) throw err;
          console.table(data);
          mainMenu();
        });
      }
      // first name, last name, role, and manager
function AddEmployee() {
    let userInput1;
    // display a list as choice includes all roles
    const query = `SELECT id, title FROM role WHERE title NOT LIKE '%Manager%';`;
  
    Promise.resolve()
      .then(() => {
        return new Promise((resolve, reject) => {
          connection.query(query, (err, data) => {
            if (err) reject(err);
            else resolve(data);
          });
        });
      })
      .then((rolesData) => {
        // make a new array to store all role titles
        //console.log("line 213 rolesData", rolesData);
        const roles = rolesData.map(
          (item) => `Role title: ${item.title}, Role ID: ${item.id}`
        );
  
        return inquirer.prompt([
          {
            name: "first_name",
            type: "input",
            message: "What is the employee's first name?",
          },
          {
            name: "last_name",
            type: "input",
            message: "What is the employee's last name?",
          },
          {
            name: "role",
            type: "list",
            message: "What is the employee's role id?",
            choices: roles,
          },
        ]);
      })
      .then((answer) => {
        // console.log("answer1", answer); //returns { first_name: 'a', last_name: 'b', role: 'Salesperson' }
        userInput1 = answer;
        // display manager id, first name, last name as managers
        const query2 = `SELECT 
        manager.id as manager_id,
        CONCAT(manager.first_name, ' ', manager.last_name) AS manager_name
        FROM employee
        LEFT JOIN role ON employee.role_id = role.id
        LEFT JOIN employee AS manager ON manager.id = employee.manager_id 
        WHERE manager.id IS NOT NULL
        GROUP BY manager_id;`;
        return new Promise((resolve, reject) => {
          connection.query(query2, (err, data) => {
            if (err) reject(err);
            else resolve(data);
          });
        });
      })
      .then((managersData) => {
        //console.log("line 256 @@@", managersData);
        // make a new array to store all manager names
        const managers = managersData.map(
          (item) => `${item.manager_name} ID:${item.manager_id}`
        );
  
        return inquirer.prompt([
          {
            name: "manager",
            type: "list",
            message: "Which manager is the employee under?",
            choices: [...managers, "None"],
          },
        ]);
      })
      .then((answer) => {
        //console.log("line 274 answer2", userInput1,answer);
        // add ee to db based on user input
        const query = `INSERT INTO employee 
        (first_name, last_name, role_id, manager_id) 
        VALUES (?, ?, ?, ?)`;
        // console.log("answer3", answer); // returns manager's role by user input
        connection.query(
          query,
          [
            userInput1.first_name,
            userInput1.last_name,
            userInput1.role.split("ID: ")[1],
            answer.manager.split("ID:")[1],
          ],
          //console.log("###",[userInput1.first_name, userInput1.role.split('ID: ')[1], answer.manager.split('ID:')[1]]),
          (err, data) => {
            if (err) throw err;
            console.log(
              `Added ${userInput1.first_name} ${userInput1.last_name} to the database`
            );
            ViewAllEmployees();
          }
        );
      });
  }
  