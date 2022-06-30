DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

USE company_db

CREATE TABLE department (
    id INT AUTO_INCREMENT PRIMARY KEY,
    department_name VARCHAR(30)
);

CREATE TABLE role (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL,
    FOREIGN KEY(department_id)
    REFERENCES department(id)
    --potentially on delete set null
);

CREATE TABLE employee (
    id INT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    FOREIGN KEY(role_id)
    REFERENCES(role.id)
    FOREIGN KEY(manager_id),
    REFERENCES(employee.id)
);