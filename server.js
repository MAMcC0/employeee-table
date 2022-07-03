const express = require('express');
// Import and require mysql2

const inquirer = require("inquirer");
const mysql = require('mysql2');
require("dotenv").config();

const PORT = process.env.PORT || 3001;
const app = express();


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: DB_USER,
      // TODO: Add MySQL password here
      password: DB_PASSWORD,
      database: DB_NAME,
    },
    console.log(`Connected to the company_db database.`)
  );

app.use((req, res) => {
  res.status(404).end();
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



///Create directory function////


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
    directionQuestion()

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
                    type:'confirm',
                    name: 'managerConfirm',
                    message: "Does this employee have a manager?",
                    default: true,
                },
                {/// have to render list of current managers before asking question
                    type:'input',
                    name: 'manager',
                    message: "What is the manager's name?",
                    when: (data) => {
                        if(data.managerConfirm === true){
                            return true;
                        }
                    }
                },
                
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
                message: "What is the employee's name?",
            },
            {
                type: 'list',
                name: 'employeeUpdate',
                message: "What is the employee's new role?",

                ///render list of roles at that time before asking the new question
            },
        ])

    };

   

    function addRole (){
        inquirer
        .prompt([
            {
                type: 'input',
                name: 'newRoleTitle',
                message: "What is the name of the new role?",
            },
            {
                type: 'input',
                name: 'newRoleSalary',
                message: "What is the salary for this role?",
            },
            {
                type: 'list',
                name: 'newRoleDepartment',
                message: "What department does this role belong to?",
            },
        ])
    };


    function addDepartment(){
        inquirer
        .prompt([
            {
                type: 'input',
                name: 'newDepartment',
                message: "What is the new department's name?",
            },
        ])
    };



};

createDirectory();