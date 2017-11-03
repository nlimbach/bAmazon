
DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;
USE bamazon_DB;

CREATE TABLE products(
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(100) NOT NULL,
  price INT default 0,
  stock_quantity INT default 0,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("TELEVISION", "Electronics", 300, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bluetooth Speakers", "Electronics", 75, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Amazon Echo", "Electronics", 125, 15);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Roomba", "Home and Kitchen", 240, 10);


INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Crockpot", "Home and Kitchen", 35, 10);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Exploding Kittens", "Toys & Games", 75, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Settlers of Catan", "Toys & Games", 20, 20);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Chardonnay", "Wine", 15, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Cabernet Sauvignon", "Wine", 25, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Bicycle", "Sports and Outdoors", 15, 5);