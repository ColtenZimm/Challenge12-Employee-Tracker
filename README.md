# SQL Challenge: Employee Tracker

User can use this terminal application to view and manage the departments, roles, and employees in a company, in order to manage their business.


## 🚀 Description

With this application, user can:
- view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
-  showing department names and department ids
- view all roles' job title, role id, the department that role belongs to, and the salary for that role
- view a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
- view department information
- add a role, an employee or a department
- remove a role, an employee or a department
- view the total utilized budget of a department—in other words, the combined salaries of all employees in that department



## 📺 Demo


[Click here for walk through video](https://user-images.githubusercontent.com/112605297/218927199-f4fce049-907c-447e-aa58-7154347dbe35.mov)
## 🛠 Technologies 

**Runtime:** Node.js

**Language:** Javascript

**Dependencies:** 

    "console.table": "^0.10.0",
    "inquirer": "^8.2.4",
    "mysql2": "^3.0.1",
    "express": "^4.17.1"


## 💾 Installation


With the package.json file, use jest to execute the tests in the terminal by the following command:
```
npm i
```

Or install all the following dependencies:
```
npm instal console.table

npm install inquirer

npm install mysql2

npm install express
```
For npm scripts:
```
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node index.js"
  }
```
## Usage

To execute MySQL shell in the terminal by the following command:
```
mysql -u root
```
or if you have a password for database try:
```
mysql -u root -p
```
then source the schema file:
```
SOURCE db/schema.sql;
```
To seed the database:
```
SOURCE db/seeds.sql;
```
To run the application:
```
node index.js
```


## Badges

Add badges from somewhere like: [shields.io](https://shields.io/)

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
