const inquirer = require('inquirer');
const connection = require('./connection.js');
require('console.table');

// Define our Function
function start() {
    inquirer.prompt([
        {
            type: "list",
            name: "viewChoice",
            message: "What would you like to do?",
            choices: [
                {
                    name: "View All Departments",
                    value: "VIEW_DEPARTMENTS"
                },
                {
                    name: "View All Roles",
                    value: "VIEW_ROLES"
                },
                {
                    name: "View All Employees",
                    value: "VIEW_EMPLOYEES"
                },
                {
                    name: "Add Department",
                    value: "ADD_DEPARTMENT"
                },
                {
                    name: "Add Roles",
                    value: "ADD_ROLES"
                },
                {
                    name: "Add Employees",
                    value: "ADD_EMPLOYEES"
                },
                {
                    name: "Exit Program",
                    value: "QUIT"
                }
            ]
        }
    ]).then(response => {
        console.log(response);
        console.log(response.viewChoice);

        // SWITCH STATEMENT (to direct where we go next)
        if(response.viewChoice === "VIEW_DEPARTMENTS") {
            viewDepartments();
        } else if(response.viewChoice === "VIEW_ROLES") {
            viewRoles();
        }
         else if(response.viewChoice === "VIEW_EMPLOYEES") {
            viewEmployees();
        }
        else if(response.viewChoice === "ADD_DEPARTMENT") {
            addDepartment();
        }
        else if(response.viewChoice === "ADD_ROLES") {
            addRoles();
        }
        else if(response.viewChoice === "ADD_EMPLOYEES") {
            addEmployees();
        }
        else {
            console.log("No");
            start();
        }
    })
    .catch(err => console.log(err))
}


function viewDepartments()  {
    // make a QUERY REQUEST to our DB
    connection.query("SELECT id, name FROM department", (err, data) => {
        if(err) {
            console.log(err);
        }
        // console.log(data);
        console.table(data)
        // Call out start function again
        start();
    });
}

function viewRoles() {
    connection.query("SELECT id, title, salary, department_id FROM role", (err, data) => {
        if(err) {
            console.log(err);
        }
        // console.log(data);
        console.table(data)
        // Call out start function again
        start();
    });
}

function viewEmployees() {
    connection.query("SELECT id, first_name, last_name, role_id, manager_id FROM employee" , (err, data) => {
        if(err) {
            console.log(err);
        }
        // console.log(data);
        console.table(data)
        // Call out start function again
        start();
    });
}

function addDepartments() {

    // Collect/Capture User input (what is the Department Name?)  (Async Function Call)
    inquirer.prompt(
        {
            type: "input",
            name: "departmentName",
            message: "What would you like to name your new department?"
        }).then(response => {
            // What is our QUERY to ADD a NEW DEPARTMENT (Async Function Call)
            const query = "INSERT INTO department SET ?";
            connection.query(query, { name: response.departmentName }, (err, data) => {
                if(err) {
                    console.log(err);
                }
                console.log(query);
                console.log(data);
                start();
            })
        }).catch(err => {
            console.log(err);
        })

}

function addDepartment() {

    // Collect/Capture User input (what is the Department Name?)  (Async Function Call)
    inquirer.prompt(
        {
            type: "input",
            name: "departmentName",
            message: "What would you like to name your new department?"
        }).then(response => {
            // What is our QUERY to ADD a NEW DEPARTMENT (Async Function Call)
            const query = "INSERT INTO department SET ?";
            connection.query(query, { name: response.departmentName }, (err, data) => {
                if(err) {
                    console.log(err);
                }
                console.log(query);
                console.log(data);
                start();
            })
        }).catch(err => {
            console.log(err);
        })

}

function addRoles() {
    inquirer.prompt([
        {
            type: "input",
            name: "addTitle",
            message: "New Role Title:",
            
        },
        {
            type: "input",
            name: "addSalary",
            message: "New Role's Salary:",
            
        },
        {
            type: "input",
            name: "addDepID",
            message: "Insert into which department? (Type Department ID):",
            
        }
    ]).then(response => {
            // What is our QUERY to ADD a NEW DEPARTMENT (Async Function Call)
            const query = "INSERT INTO role SET ?";
            connection.query(query, { title: response.addTitle, salary: response.addSalary, department_id: response.addDepID }, (err, data) => {
                if(err) {
                    console.log(err);
                }
                console.log(query);
                console.log(data);
                start();
            })
        }).catch(err => {
            console.log(err);
        });

}

function addEmployees() {
    inquirer.prompt([
        {
            type: "input",
            name: "firstName",
            message: "What is the new employee's first name?",
            
        },
        {
            type: "input",
            name: "lastName",
            message: "What is the new employee's last name?",
            
        },
        {
            type: "input",
            name: "roleID",
            message: "Insert into which department? (Type Department ID):",
            
        }
    ]).then(response => {
            // What is our QUERY to ADD a NEW DEPARTMENT (Async Function Call)
            const query = "INSERT INTO role SET ?";
            connection.query(query, { title: response.addTitle, salary: response.addSalary, department_id: response.addDepID }, (err, data) => {
                if(err) {
                    console.log(err);
                }
                console.log(query);
                console.log(data);
                start();
            })
        }).catch(err => {
            console.log(err);
        });

}

// Invoke our START function
start()