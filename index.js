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