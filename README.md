# Database Name : retail
# Database Schema and Inserted Values

# Schema
create table User(id int primary key,username varchar(20) unique not null,password varchar(50) unique not null,role varchar(20));

CREATE TABLE Employee (
    employee_id INT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    phone_number VARCHAR(15) UNIQUE,
    email VARCHAR(100) UNIQUE,
    hire_date DATE NOT NULL,
    dept_id INT,
    manager_id INT,
    salary DECIMAL(10, 2) NOT NULL,
    address VARCHAR(150),
    birth_date DATE,
    gender CHAR(1) CHECK (gender IN ('M', 'F', 'O')), -- M for Male, F for Female, O for Other
    image_url VARCHAR(100)
);

CREATE TABLE Department (
    dept_id INT PRIMARY KEY,
    dept_name VARCHAR(50) NOT NULL UNIQUE,
    manager_id INT
);

CREATE TABLE Customer (
    customer_id INT PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    membership ENUM('Standard', 'Silver', 'Gold', 'Platinum') DEFAULT NULL,
    email VARCHAR(100) UNIQUE DEFAULT NULL,
    phone_number VARCHAR(15) DEFAULT NULL,
    address VARCHAR(200) DEFAULT NULL
);

CREATE TABLE Supplier (
    SupplierID INT PRIMARY KEY,
    SupplierName VARCHAR(255) NOT NULL,
    Phone VARCHAR(10) NOT NULL UNIQUE,
    Email VARCHAR(255) NOT NULL UNIQUE,
    Address VARCHAR(255)NOT NULL,
    City VARCHAR(100),
    Country VARCHAR(100),
    item_id INT NOT NULL,
    Rating INT CHECK (Rating >= 1 AND Rating <= 5)
);

CREATE TABLE Item (
	batch_id INT PRIMARY KEY,
    item_id INT,
    item_name VARCHAR(100) NOT NULL,
    price_bought DECIMAL(10, 2) NOT NULL,
    price_sold DECIMAL(10, 2) NOT NULL,
    quantity_in_stock INT DEFAULT 0,
    shelf_life_days INT,
    shelf_no VARCHAR(50),
    discount DECIMAL(5, 2) DEFAULT 0.00
);

CREATE TABLE Buy (
    buy_id INT PRIMARY KEY AUTO_INCREMENT,
    customer_id INT NOT NULL,
    item_id INT NOT NULL,
    quantity INT DEFAULT 1,
    purchase_date Timestamp DEFAULT current_timestamp,
    UNIQUE (customer_id, item_id, purchase_date)
);

CREATE TABLE Supplies (
    Supplier_id INT,
    Item_id INT,
    Batch_id INT,
    PRIMARY KEY (Supplier_id, Item_id)
);

# Inserted Values
insert into user(id,username,password,role) values(100,'vedaant','student','administrator');

