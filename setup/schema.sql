DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INTEGER(11) AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(250),
  department_name VARCHAR(250),
  price DECIMAL(10,2),
  stock_quantity INTEGER(10),
  PRIMARY KEY (item_id)
);
