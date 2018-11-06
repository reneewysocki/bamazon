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

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bridle", "Tack", 150.00, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Saddle", "Tack", 2500.00, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Saddle Pad", "Tack", 59.99, 100);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Breeches", "Apparel", 89.99, 75);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Curry Comb", "Grooming Supplies", 9.99, 150);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Martingale", "Tack", 45.99, 65);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Helmet", "Apparel", 75.99, 125);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Muck Boots", "Apparel", 75.99, 80);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Clipper", "Grooming Supplies", 25.99, 75);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Halter", "Tack", 30.00, 60);
