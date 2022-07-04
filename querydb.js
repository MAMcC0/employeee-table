const mysql = require('mysql2');
const db = require('./server');

 function displayAllEmployees(){
    const sql = `SELECT employee.id, 
    employee.first_name,
    employee.last_name, 
    employee.role_id,
    roles.title, 
    roles.salary, 
    roles.department_id,
    department.department_name, 
    employee.manager_id,
    CONCAT(manager.first_name, ' ', manager.last_name) 
    AS MANAGER
	FROM employee employee
    LEFT JOIN employee manager
    ON employee.manager_id = manager.id
	JOIN roles
    ON roles.id=employee.role_id
	JOIN department
    ON roles.department_id = department.id; `;
    db.query(sql, (err,res) => {
     try {
        if (res){
            renderEmployAll(res);
        }
       } catch (err){
        console.error(err);
       }
    });
};

function viewRoles(){
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
       try {if(res){
        renderRoleAll(res);
       } }
       catch (err){
        console.error(err)
       };
    });
};


function viewDepartments(){
    const sql = `SELECT * FROM department;`;
    db.query(sql, (err,res) => {
       try {
        if(res){
            renderDepartAll(res);
        }
       } catch (err){
        console.error(err)
       };
    });
};

function employeeQuery({first_name, last_name, role, manager}){
    const sql = `INSERT INTO employee(first_name, last_name, employee.role, manager) VALUES (?,?,?,?);`;
    const values = [first_name, last_name, role, manager];

    db.query(sql, values, (err, res) => {
        try {
         if(res){
             renderNewEmployee(res);
         }
        } catch (err){
         console.error(err)
        };
     });
};

function employeeUpdateQuery({id, role}){
   async function getRoleId(){
        const sqlOne = `SELECT id FROM roles WHERE title = '?';`;
        const valueOne = role;
        db.query(sqlOne,  valueOne, (err, res) => {
             if(res){
                 return role.id;
             }else {
              
             console.error(err)
            };
        })

    };
    
 const sql = `UPDATE employee SET role_id = ? WHERE id = ?`;
    const role_id = getRoleId();
    const values = (role_id, id);

    db.query(sql, values, (err, res) => {
        try {
         if(res){
             renderEmployeeUp(res);
         }
        } catch (err){
         console.error(err)
        };
     });
};


function  roleAdding({title, salary, department_id}){
    const sql = `INSERT INTO role(title, salary, department_id) VALUES (?,?,?);`;
    const values = (title, salary, department_id);
    db.query(sql, values, (err, res) => {
        try {
         if(res){
             renderRoleAdd(res);
         }
        } catch (err){
         console.error(err)
        };
     });
}

function departmentAdding({department_name}){
    const sql = `INSERT INTO department (department_name) VALUES (?);`;
    const value = department_name;
    db.query(sql, value, (err, res) => {
        try {
         if(res){
            return renderDepartNew(res);
         }
        } catch (err){
         console.error(err)
        };
     });
}

module.exports = {
    renderDepartNew,
    renderRoleAdd,
    renderEmployeeUp,
    renderNewEmployee,
    renderRoleAll,
    renderDepartAll,
    renderEmployAll,
};