DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon; 

CREATE TABLE products ( 
    -- id INT AUTO_INCREMENT NOT NULL,--
    id INT NOT NULL,
    product_name VARCHAR(100) NOT NULL, 
    department_name VARCHAR(50) NULL,
    price DECIMAL(10,2) NOT NULL, 
    stock_quantity INT NOT NULL,
    PRIMARY KEY (id)
); 


