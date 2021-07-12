-- Drops the employee_tracker if it exists currently --
DROP DATABASE IF EXISTS employee_tracker;
-- Creates the "employee_tracker" database --
CREATE DATABASE employee_tracker;

-- Creates the "employee" table 
CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL
);

-- Creates the "title" table
CREATE TABLE title (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  employee_title VARCHAR(30) NOT NULL
);

-- Creates the "title" table
CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  employee_department VARCHAR(30) NOT NULL
);