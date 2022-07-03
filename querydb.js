const mysql = require('mysql2');
const db = require('./server');

 function displayAllEmployees(){
    const sql = `SELECT * FROM employee;`;
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
    const sql = `SELECT * FROM role;`;
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
    const sql = `INSERT INTO employee(first_name, last_name, role, manager) VALUES (?,?,?,?);`;
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
        const sqlOne = `SELECT id FROM role WHERE id = ?;`;
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
    const role_id = await getRoleId();
    const values = (id, role_id);

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