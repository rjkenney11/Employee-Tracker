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
                    name: "Delete Employees",
                    value: "DEL_EMPLOYEES"
                },
                {
                    name: "Delete Roles",
                    value: "DEL_ROLES"
                },
                {
                    name: "Delete Departments",
                    value: "DEL_DEPARTMENTS"
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
        else if(response.viewChoice === "DEL_EMPLOYEES") {
            deleteEmployees();
        }
        else if(response.viewChoice === "DEL_ROLES") {
            deleteRoles();
        }
        else if(response.viewChoice === "DEL_DEPARTMENTS") {
            deleteDepartments();
        }
        else {
            connection.end();
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
                viewDepartments();

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
                
                viewRoles();
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
            message: "What is the ID of this employee's current role?",
            
        },
        {
            type: "input",
            name: "managerID",
            message: "What is their supervisor's ID number?",
            validation: "integer",
        }
    ]).then(response => {
            // What is our QUERY to ADD a NEW DEPARTMENT (Async Function Call)
            const query = "INSERT INTO employee SET ?";
            connection.query(query, { first_name: response.firstName, last_name: response.lastName, role_id: response.roleID, manager_id: response.managerID }, (err, data) => {
                if(err) {
                    console.log(err);
                }
                console.log(query);
                viewEmployees();
                start();
            })
        }).catch(err => {
            console.log(err);
        });

}

function deleteEmployees() {
     
        inquirer.prompt([
            {
                type: "input",
                message: "What is the ID of the employee you wish to delete?",
                name: "employeeID"
              },
        
        ])
         .then(response => {
            const query = "DELETE FROM employee WHERE ?";
            
            connection.query(query, { id: response.employeeID }, (err, data) => {
                if(err) {
                    console.log(err);
                }
                console.log(query);
                viewEmployees();
                start();
            })
                }).catch(err => {
                    console.log(err);
                });


    }

    function deleteRoles() {
     
        inquirer.prompt([
            {
                type: "input",
                message: "What is the ID of the role you wish to delete?",
                name: "roleID"
              },

        ])
         .then(response => {
            const query = "DELETE FROM role WHERE ?";
            
            connection.query(query, { id: response.roleID }, (err, data) => {
                if(err) {
                    console.log(err);
                }
                console.log(query);
                viewRoles();
                start();
            })
                }).catch(err => {
                    console.log(err);
                });


    }

    function deleteDepartments() {
     
        inquirer.prompt([
            {
                type: "input",
                message: "What is the ID of the department that you wish to delete?",
                name: "departmentID"
              },

        ])
         .then(response => {
            const query = "DELETE FROM department WHERE ?";
            
            connection.query(query, { id: response.departmentID }, (err, data) => {
                if(err) {
                    console.log(err);
                }
                console.log(query);
                viewDepartments();
                start();
            })
                }).catch(err => {
                    console.log(err);
                });


    }




// Invoke our START function
start()