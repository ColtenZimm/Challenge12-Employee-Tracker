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