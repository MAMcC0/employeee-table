const express = require('express');
// Import and require mysql2
const inquirer = require("inquirer");
const mysql = require('mysql2');
const logo = require('asciiart-logo');




const PORT = process.env.PORT || 3001;
const app = express();


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
    {
        host: 'localhost',
        // MySQL username,
        user: 'root',
        // TODO: Add MySQL password here
        password: 'stupidpassword1',
        database: 'company_db',
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

    console.log(
        logo({
            name: 'Employee Tracker',
            borderColor: 'white',
            logoColor: 'bold-white',
        })
            .render()
    );

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
                switch (answer.choice) {
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

    function createEmployee() {
        inquirer
            .prompt(
                [
                    {
                        type: 'input',
                        name: 'first_name',
                        message: "What is the employee's first name?",
                    },
                    {
                        type: 'input',
                        name: 'last_name',
                        message: "What is the employee's last name?",
                    },
                    {
                        type: 'input',
                        name: 'role',
                        message: "What is the employee's role id?",
                    },
                    {
                        type: 'confirm',
                        name: 'managerConfirm',
                        message: "Does this employee have a manager?",
                        default: true,
                    }])
            .then(
                renderManagers()
            )
            .then(
                inquirer
                    .prompt([
                        {
                            type: 'input',
                            name: 'manager',
                            message: "What is the manager's name?",
                            when: (data) => {
                                if (data.managerConfirm === true) {
                                    return true;
                                }
                            }
                        },

                    ]

                    ))
            .then(data => {
                const employValues = (data.first_name, data.last_name, data.role, data.manager);
                employeeQuery(employValues);

            });
            directionQuestion()
    }
   



    function updateEmployee() {
        displayAllEmployees()


        inquirer
            .prompt([
                {
                    type: 'number',
                    name: 'employeeUpdateid',
                    message: "What is the employee's id?",
                },
                {
                    type: 'input',
                    name: 'employeeUpdateRole',
                    message: "What is the employee's new role?",


                },
            ])
            .then(data => {
                const employUpdate = (data.employeeUpdateId, data.employeeUpdateRole);

                employeeUpdateQuery(employUpdate);

            });
        
    };



    function addRole() {
        viewDepartments()
            .then(
                inquirer
                    .prompt([
                        {
                            type: 'input',
                            name: 'newRoleTitle',
                            message: "What is the name of the new role?",
                        },
                        {
                            type: 'number',
                            name: 'newRoleSalary',
                            message: "What is the salary for this role?",
                        },
                        {
                            type: 'input',
                            name: 'newRoleDepartment',
                            message: "What is the id of the department this role belongs to?",
                        },
                    ])
                    .then(data => {
                        const roleAdd = (data.newRoleTitle, data.newRoleSalary, data.newRoleDepartment);
                        roleAdding(roleAdd);

                    }));
        

    };


    function addDepartment() {
        inquirer
            .prompt([
                {
                    type: 'input',
                    name: 'newDepartment',
                    message: "What is the new department's name?",
                },
            ])
            .then(data => {
                const departmentNew = (data.newDepartment);
                departmentAdding(departmentNew);

            });
    };
};



///query functions
function displayAllEmployees() {
    const sql = `SELECT employee.id, 
        employee.first_name,
        employee.last_name, 
        roles.title, 
        roles.salary, 
        department.department_name, 
        CONCAT(manager.first_name, ' ', manager.last_name) 
        AS MANAGER
        FROM employee employee
        LEFT JOIN employee manager
        ON employee.manager_id = manager.id
        JOIN roles
        ON roles.id=employee.role_id
        JOIN department
        ON roles.department_id = department.id; `;
    db.query(sql, (err, res) => {
        return console.table(res);

    });

};

function viewRoles() {
    const sql = ` SELECT 
        roles.title,
         roles.id, 
         roles.salary,
        department.department_name
        FROM roles
        RIGHT JOIN department
        ON roles.department_id = department.id
         ;`;
    db.query(sql, (err, res) => {
        try {
            if (res) {
                console.table(res);
            }
        }
        catch (err) {
            console.error(err)
        };
    });
};


function viewDepartments() {
    const sql = `SELECT * FROM department;`;
    db.query(sql, (err, res) => {
        try {
            if (res) {
                console.table(res);
            }
        } catch (err) {
            console.error(err)
        };
    });
};

function employeeQuery({ first_name, last_name, role, manager }) {
    const sql = `INSERT INTO employee(first_name, last_name, employee.role, manager) VALUES (?,?,?,?);`;
    const values = [first_name, last_name, role, manager];

    db.query(sql, values, (err, res) => {
        try {
            if (res) {
                console.table(res);
            }
        } catch (err) {
            console.error(err)
        };
    });
};

function employeeUpdateQuery({ id, role }) {
    async function getRoleId() {
        const sqlOne = `SELECT id FROM roles WHERE title = '?';`;
        const valueOne = role;
        db.query(sqlOne, valueOne, (err, res) => {
            if (res) {
                return role.id;
            } else {

                console.error(err)
            };
        })

    };

    const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
    const role_id = getRoleId();
    const values = (role_id, id);

    db.query(sql, values, (err, res) => {
        try {
            if (res) {
                console.table(res);
            }
        } catch (err) {
            console.error(err)
        };
    });
};


function roleAdding({ title, salary, department_id }) {
    const sql = `INSERT INTO role(title, salary, department_id) VALUES (?,?,?);`;
    const values = (title, salary, department_id);
    db.query(sql, values, (err, res) => {
        try {
            if (res) {
                console.table(res);
            }
        } catch (err) {
            console.error(err)
        };
    });
}

function departmentAdding({ department_name }) {
    const sql = `INSERT INTO department (department_name) VALUES (?);`;
    const value = department_name;
    db.query(sql, value, (err, res) => {
        try {
            if (res) {
                console.table(res);
            }
        } catch (err) {
            console.error(err)
        };
    });
}



createDirectory();

