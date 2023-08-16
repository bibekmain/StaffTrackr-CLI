const mysql = require("mysql2");
const inquirer = require("inquirer");

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'employee_db'
    },
);

function init(){
    inquirer.prompt([
        {
            name: "init",
            type: "list",
            choices: ["View Departments", "View Roles", "View Employees", "Add Department", "Add Role", "Add Employee", "Update Employee's Role"]
        }
    ]).then((res) => {
        switch(res.init){
            case "View Departments":
                viewDepartments();
                break;
            case "View Roles":
                viewRoles();
                break;
            case "View Employees":
                viewEmployees();
                break;
            case "Add Department":
                addDepartment();
                break;
            case "Add Role":
                addRole();
                break;
            case "Add Employee":
                addEmployee();
                break;
            case "Update Employee's Role":
                updateEmployeeRole();
                break;
        }
    });
}

function viewDepartments(){
    console.log("This is in viewDepartments");
};
  
function viewRoles(){

};
        
function viewEmployees(){

};
    
function addDepartment(){
    inquirer.prompt([
        {

        }
    ]).then((res) => {

    });
};
    
function addRole(){
    inquirer.prompt([
        {

        }
    ]).then((res) => {

    });
};
          
function addEmployee(){
    inquirer.prompt([
        {

        }
    ]).then((res) => {

    });
};
      
function updateEmployeeRole(){
    inquirer.prompt([
        {

        }
    ]).then((res) => {

    });
};



init();