const inquirer = require("inquirer");





const createDirectory = () => {

    const directionQuestion = () => {
        inquirer
            .prompt(
                [{
                    type: 'list',
                    name: 'choice',
                    message: 'What would you like to do?',
                    choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add Role', 'View All Departments', 'Add Department', 'Quit']
                }

                ]

            )
            .then(answer => {
                switch(answer.choice){
                    case 'View All Employees':
                        displayAllEmployees();
                        break;
                    case 'Add Employee':
                        createEmployee();
                        break;
                    case 'Update Employee Role':
                        updateEmployee();
                        break;
                    case 'View All Roles':
                        viewRoles();
                        break;
                    case 'Add Role':
                        addRole();
                        break;
                    case 'View All Departments':
                        viewDepartments();
                        break;
                    case 'Add Department':
                        addDepartment();
                        break;
                    case 'Quit':
                        end();
                        break;
                }
            })
    };



    function displayAllEmployees(){
        //how to set the query for straight to display
    };

    function createEmployee(){
        inquirer
        .prompt(
            [
                {
                    type:'input',
                    name: 'id',
                    message: "What is the employee's id?",

                },
                {
                    type:'input',
                    name: 'first_name',
                    message: "What is the employee's first name?",
                },
                {
                    type:'input',
                    name: 'last_name',
                    message: "What is the employee's last name?",
                },
                {
                    type:'input',
                    name: 'role',
                    message: "What is the employee's role id?",
                },
                {
                    type:'input',
                    name: 'id',
                    message: "What is the employee's id?",
                },
                {
                    type:'list',
                    name: 'manager',
                    message: "What is the employee's id?",
                }
                //conditional statement for manager's id?
            ]
            
        )
         .then(data => {
            const employee = new Employee()
             employee.id,
                 employee.firstName,
                 employee.lastName,
                 employee.role
         })   
    }

    function updateEmployee(){
        inquirer
        .prompt([
            {
                type: 'input',
                name: 'employeeUpdateId',
                message: "What is the employee's id?",
            },
            {
                type: 'input',
                name: 'employeeUpdate',
                message: "What is the employee's new role?",
            },
        ])

    };

    function viewRoles(){


    };

    function addRole







};