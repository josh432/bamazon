DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
	item_id INTEGER(10) AUTO_INCREMENT NOT NULL,
    product_name VARCHAR(30) NOT NULL,
    price FLOAT(10) NOT NULL,
    department VARCHAR(30) NOT NULL,
    stock_quantity INTEGER(10) NOT NULL,
    PRIMARY KEY(item_id)
    
);

SELECT * FROM products;

ALTER TABLE products MODIFY price FLOAT(10)NOT NULL;

UPDATE products SET department="Women's Apparel" WHERE product_name="Women's Dresses";

UPDATE products SET department="Men's Apparel" WHERE product_name="Men's Pants";
INSERT INTO products(product_name, price, department, stock_quantity) VALUES ("Table Lamps", 99.99 , "Home", 25);
INSERT INTO products(product_name, price, department, stock_quantity) VALUES ("Baseball Caps", 15.99 , "Sporting Goods", 300);
INSERT INTO products(product_name, price, department, stock_quantity) VALUES ("Men's Pants", 59.99 , "Menswear", 100);
INSERT INTO products(product_name, price, department, stock_quantity) VALUES ("Women's Dresses", 79.99 , "Womens Ware", 40);
INSERT INTO products(product_name, price, department, stock_quantity) VALUES ("Aspirin", 5.99 , "Pharmacy", 25);
INSERT INTO products(product_name, price, department, stock_quantity) VALUES ("Barbie Dolls", 15.99 , "Toys", 300);
INSERT INTO products(product_name, price, department, stock_quantity) VALUES ("Sunscreen", 10.99 , "Pharmacy", 10);
INSERT INTO products(product_name, price, department, stock_quantity) VALUES ("Lego sets", 59.99 , "Toys", 100);
INSERT INTO products(product_name, price, department, stock_quantity) VALUES ("Desktop Computer", 449.99 , "Electronics", 30);
INSERT INTO products(product_name, price, department, stock_quantity) VALUES ("Laptop Computer", 649.99 , "Electronics", 40);
INSERT INTO products(product_name, price, department, stock_quantity) VALUES ("Laptop Computer", 649.99 , "Electronics", 40);