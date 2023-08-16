const mysql = require("mysql2");
const inquirer = require("inquirer");

// create a connection with the mysql database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'password',
        database: 'employee_db'
    },
);

async function queryDatabase(sql){
    return new Promise((resolve, reject) => {
        db.query(sql, (err, results) => {
            if(err) return reject(err);
            resolve(results);
        })
    });
}

function init(){
    console.log("\n \x1b[1m\x1b[42m Main Menu \x1b[0m \n");
    //initial prompt to user
    inquirer.prompt([
        {
            name: "init",
            type: "list",
            message: "What do you want to do?",
            choices: ["View Departments", "View Roles", "View Employees", "Add Department", "Add Role", "Add Employee", "Update Employee's Role", "Exit"]
        }
        //switch cases for each selection
    ]).then((res) => {
        switch(res.init){
            case "View Departments":
                viewDepartments(true);
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
            case "Exit":
                db.end();
                break;
            default:
                break;
        }
    });
}

//function that displays the departments
async function viewDepartments(runInit){
    //query all departments
    const departments = await queryDatabase("SELECT * FROM department");

    console.log("\n \x1b[33m Showing All Departments: \x1b[0m");
    console.table(departments);
    runInit ? init() : null;
};

//function that displays the roles
async function viewRoles(){
    //query all roles
    const roles = await queryDatabase("SELECT * FROM role");

    console.log("\n \x1b[33m Showing All Roles: \x1b[0m");
    console.table(roles);
    init();
};

//function that displays the employees
async function viewEmployees(){
    //query all employees
    const employees = await queryDatabase("SELECT * FROM employee");

    console.log("\n \x1b[33m Showing All Employees: \x1b[0m");
    console.table(employees);
    init();
};

//function that adds a department
function addDepartment(){
    inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "Enter the new department name:"
        }
    ]).then((res) => {
        //query the database to add a department
        db.query(`INSERT INTO department (name) VALUES ("${res.name}")`);
        console.log(`\n \x1b[5m\x1b[34m ${res.name} added to departments! \x1b[0m \n`);
        init();
    });
};

//function that adds a role
async function addRole(){ 
    //query all departments
    const departments = await queryDatabase("SELECT * FROM department");

    inquirer.prompt([
        {
            name: "title",
            type: "input",
            message: "Enter the title of the role:"
        },
        {
            name: "salary",
            type: "input",
            message: "Enter the salary of the role:"
        },
        {
            name: "dept_id",
            type: "list",
            message: "Select the department this role falls under:",
            choices: departments.map((department) => ({name: department.name, value: department.id}))
        }
    ]).then((res) => {
        //query the databse to add the role
        db.query(`INSERT INTO role (title, salary, department_id) 
                VALUES ("${res.title}", ${res.salary}, ${res.dept_id})`);
        console.log(`\n \x1b[5m\x1b[34m ${res.title} added to roles! \x1b[0m \n`);
        init();
    })
};

//function that adds an employee
async function addEmployee(){
    const roles = await queryDatabase("SELECT * FROM role");
    const employees = await queryDatabase("SELECT * FROM employee");

    inquirer.prompt([
        {
            name: "first_name",
            type: "input",
            message: "Enter the first name:"
        },
        {
            name: "last_name",
            type: "input",
            message: "Enter the last name:"
        },
        {
            name: "role_id",
            type: "list",
            message: "Select the role:",
            choices: roles.map((role) => ({name: role.title, value: role.id}))
        },
        {
            name: "manager_id",
            type: "list",
            message: "Select the manager:",
            choices: () => {
                let final = employees.map((employee) => ({name: employee.first_name + " " + employee.last_name, value: employee.id}));
                final.push({name: "None", value: null});
                return final;
            }
            
        }
    ]).then((res) => {
        console.log("----- \n", res);
        db.query(`INSERT INTO employee (first_name, last_name, role_id, manager_id)
                Values ("${res.first_name}", "${res.last_name}", ${res.role_id}, ${res.manager_id})`);
        console.log(`\n \x1b[5m\x1b[34m ${res.first_name} has been added to the employee directory! \x1b[0m \n`);
        init();
    });
};

//function that updates an employee
async function updateEmployeeRole(){
    const employees = await queryDatabase("SELECT * FROM employee");
    const roles = await queryDatabase("SELECT * FROM role");

    inquirer.prompt([
        {
            name: "employee_id",
            type: "list",
            message: "Select the employee to update:",
            choices: employees.map((employee) => ({name: employee.first_name + " " + employee.last_name, value: employee.id}))
        },
        {
            name: "new_role",
            type: "list",
            message: "Select the role to change this employee to:",
            choices: roles.map((role) => ({name: role.title, value: role.id}))
        }
    ]).then((res) => {
        console.log(res);
    });
};

init();