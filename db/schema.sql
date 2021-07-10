-- Drops the employee_tracker if it exists currently --
DROP DATABASE IF EXISTS employee_tracker;
-- Creates the "employee_tracker" database --
CREATE DATABASE employee_tracker;

-- Creates the "employees" table 
CREATE TABLE employees (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  employee_name VARCHAR(50) NOT NULL
);