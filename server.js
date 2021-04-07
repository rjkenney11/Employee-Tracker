const inquirer = require('inquirer');
const connection = require('./connection.js');


// Define our Function
function start() {
    inquirer.prompt([
        {
            type: "list",
            name: "choice",
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
                    name: "Exit Program",
                    value: "QUIT"
                }
            ]
        }
    ]).then(response => {
        console.log(response);
        console.log(response.choice);

        // SWITCH STATEMENT (to direct where we go next)
        if(response.choice === "VIEW_DEPARTMENTS") {
            viewDepartments();
        } else {
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
        console.log(data);
        // console.table(data)
        // Call out start function again
        start();
    })
}


// Invoke our START function
start();