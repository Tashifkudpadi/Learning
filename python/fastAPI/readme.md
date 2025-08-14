# first step is to create the virtual environment.

<!-- python3 -m venv venv -->

-What is virtual environment?
A virtual environment is a self-contained Python environment that allows you to isolate your project’s dependencies from the system Python environment.
which means we can install different versions of python and packages without affecting the system python environment.

-Why do we need a virtual environment?
We need a virtual environment to ensure that our project’s dependencies are not affected by the system Python environment . This is especially important when working on multiple projects that have different dependencies. By using a virtual environment, we can ensure that each project has its own isolated environment, and we don’t have to worry about dependencies conflicting with each other.

For example, let’s say we are working on a project that requires python 3.9 and a package called pandas. If we install pandas in the system Python environment, it will be available for all projects. But what if we are working on another project that requires python 3.8 and a package called numpy? If we install numpy in the system Python environment, it will conflict with pandas, and our project will not work. By using a virtual environment, we can install pandas in one virtual environment and numpy in another virtual environment, and they will not conflict with each other.

<!-- Create and activate a virtual environment and then install FastAPI: -->
<!-- source venv/bin/activate -->

# second step is to install the fastAPI and uvicorn.

<!-- pip install fastapi uvicorn -->
<!-- or -->
<!-- pip install "fastapi[all]" -->

-What is fastAPI?
FastAPI is a modern, fast (high-performance), web framework for building APIs with Python 3.7+ based on standard Python type hints. It’s designed to be fast, scalable, and secure. It’s built on top of standard Python type hints and supports asynchronous programming.

-What is uvicorn?
Uvicorn is a Python ASGI server implementation that supports HTTP/1.1 and WebSockets. It’s a fast, production-ready ASGI server that can be used to run FastAPI applications.

<!-- to see all the installed packages, you can use the following command: -->
<!-- pip freeze -->
<!-- if u install "fastapi[all]", it will install all the dependencies. including uvicorn and graphql. -->

# third step is to create the main.py file.

touch main.py

# fourth step is to run the fastAPI.

uvicorn main:app --reload

<!-- later steps -->

pip install sqlalchemy <!-- sqlalchemy is a SQL toolkit and Object-Relational Mapping (ORM) library for Python -->
pip install psycopg2 <!-- psycopg2 is a PostgreSQL database adapter for Python, with this we can connect to the PostgreSQL database, this is a dependency of sqlalchemy without this we can't connect to the database. This is basically driver for PostgreSQL database. -->
pip install python-dotenv <!-- python-dotenv is a Python library that loads environment variables from a .env file -->

<!------------------------- sql commands ------------------------->

<!-- create database -->

CREATE DATABASE fastapi_db;

<!-- create table -->

CREATE TABLE products (
id SERIAL PRIMARY KEY,
name VARCHAR(100) NOT NULL,
price DECIMAL(10, 2) NOT NULL,
inventory INT NOT NULL,
is_sale BOOLEAN NOT NULL
);

<!-- insert data -->

INSERT INTO products (name, price, inventory, is_sale)
VALUES ('Product 1', 10.99, 10, true);

<!-- insert multiple data -->

INSERT INTO products (name, price, inventory, is_sale)
VALUES ('Product 2', 15.99, 20, false),
('Product 3', 20.99, 30, true) RETURNING \*; <!-- RETURNING asterick will return the inserted data with all the columns -->

<!-- update data -->

UPDATE products SET name = 'TV Black' WHERE id = 1 RETURNING \*; <!-- RETURNING asterick will return the updated data with all the columns -->

UPDATE products SET name = 'TV Black', price = 25.99 WHERE id = 1 RETURNING \*; <!-- RETURNING asterick will return the updated data with all the columns -->

UPDATE products SET is_sale = true WHERE id >10 RETURNING \*; <!-- RETURNING asterick will return the updated data with all the columns -->

<!-- delete data -->

DELETE FROM products WHERE id = 1;
DELETE FROM products WHERE id = 1 RETURNING \*; <!-- RETURNING asterick will return the deleted data with all the columns -->

<!-- delete multiple rows -->

DELETE FROM products WHERE id IN (1,2,3);
DELETE FROM products WHERE id IN (1,2,3) RETURNING \*; <!-- RETURNING asterick will return the deleted data with all the columns -->

<!-- drop table -->

DROP TABLE products;

<!-- drop database -->

DROP DATABASE fastapi_db;

<!-- show all databases -->

SHOW DATABASES;

<!-- select or show data -->

SELECT \* FROM products; <!-- * mark is used to select all columns -->
SELECT name, price FROM products; <!-- select only name and price columns -->

<!-- rename column -->

select id as product_id FROM products; <!-- Temp -->
ALTER TABLE products RENAME COLUMN id TO product_id; <!-- Permanent -->

<!-- to get name that start with "TV" and % means any character after TV -->

SELECT \* from products WHERE name LIKE 'TV%';

<!-- for example:  TV, TV Yellow, TV Blue, TV Red -->

<!-- to get name that end with "TV" and % means any character before TV -->

SELECT \* from products WHERE name LIKE '%TV';

<!-- to get name that contain "TV" and % means any character before and after TV -->

SELECT \* from products WHERE name LIKE '%TV%'; <!-- in between TV -->
SELECT \* from products WHERE name LIKE '%TV'; <!-- before TV -->

<!-- to make it Opposite use NOT LIKE opertaor -->

SELECT \* from products WHERE name NOT LIKE '%TV';

<!-- show one row with conditions -->

SELECT \* FROM products WHERE id = 10;
SELECT \* FROM products WHERE name = 'computer';

<!-- show all rows with conditions -->

SELECT \* FROM products WHERE price >= 10;
SELECT _ FROM products WHERE inventory != 0 AND price >10;
SELECT _ FROM products WHERE inventory > 0 AND price >10 OR price <100;
SELECT \* FROM products WHERE inventory > 0 AND (price >10 OR price <100);
SELECT \* from products WHERE id = 1 OR id = 2 OR id = 3;

<!-- or -->

SELECT \* from products WHERE id IN (1,2,3);

<!-- show all rows with conditions and limit -->

SELECT \* FROM products WHERE price > 10 LIMIT 1;

<!-- show all rows with conditions and order -->

SELECT \* FROM products WHERE price > 10 ORDER BY price DESC;
SELECT \* from products ORDER BY inventory DESC, price; <!-- first inventory then price (by default ascending) -->

<!-- to get recent data  -->

SELECT \* from products ORDER BY created_at DESC;

<!-- show all rows with conditions and order and limit -->

SELECT \* FROM products WHERE price > 10 ORDER BY price DESC LIMIT 1;

<!-- show all rows with conditions and order and limit and offset -->

SELECT \* FROM products WHERE price > 10 ORDER BY price DESC LIMIT 1 OFFSET 1;

<!-- show all rows with conditions and order and limit and offset and where -->

SELECT \* FROM products WHERE price > 10 ORDER BY price DESC LIMIT 1 OFFSET 1 WHERE inventory > 10;

<!-- show all rows with conditions and order and limit and offset and where and group by -->

SELECT \* FROM products WHERE price > 10 ORDER BY price DESC LIMIT 1 OFFSET 1 WHERE inventory > 10 GROUP BY name;

<!-- show all rows with conditions and order and limit and offset and where and group by and having -->

SELECT \* FROM products WHERE price > 10 ORDER BY price DESC LIMIT 1 OFFSET 1 WHERE inventory > 10 GROUP BY name HAVING inventory > 10;

<!-- show all rows with conditions and order and limit and offset and where and group by and having and join -->

SELECT \* FROM products WHERE price > 10 ORDER BY price DESC LIMIT 1 OFFSET 1 WHERE inventory > 10 GROUP BY name HAVING inventory > 10 JOIN orders ON products.id = orders.product_id;

<!-- to get the all the data from the 2 tables -->

SELECT posts.\* FROM posts LEFT JOIN users ON posts.owner_id = users.id;

<!-- to get the specific data from the 2 tables -->

SELECT title,content,email FROM posts LEFT JOIN users ON posts.owner_id=users.id;

<!-- if you want to get the specific data which includes the same name column for ex: id column from the 2 tables and both has id column it will through an ambiguous error -->

<!-- SELECT id,content,email FROM posts LEFT JOIN users ON posts.owner_id=users.id; -->
<!-- to solve this problem you can use the table name before the column name like this -->

SELECT posts.id,content,email FROM posts LEFT JOIN users ON posts.owner_id=users.id;

<!-- to get all the data from the 1 table and any specifuc data from the 2 table  -->
<!-- you can use the following syntax -->

SELECT posts.\*,users.email FROM posts LEFT JOIN users ON posts.owner_id = users.id;

<!-- to get the count of the posts for each user -->

select users.id, users.email, COUNT(posts.id) as users_post_count from posts RIGHT JOIN users ON posts.owner_id = users.id group by users.id;

<!-- get all the posts with likes -->

select posts.\*, COUNT(posts.id) as users_post_count from posts LEFT JOIN votes ON posts.id = votes.post_id group by posts.id;

<!-- ------------------------Hashing password----------------- -->

<!-- to hash the password we can use passlib library -->

pip install "passlib[bcrypt]"
passlib is a password hashing library for Python, it provides a simple interface to hash and verify passwords. and bcrypt is a password hashing function that is used to hash the password. bcrypt is a dependency of passlib.

<!-- JWT Token Authentication  -->

when the user sends credential to login (username+password). fastAPI will verify the credential with the database. if the credential is correct, fastAPI will generate a JWT token and send it back to the user. the user will use this token to authenticate with the API
which means user can access its posts by sending the JWT token in the header of the request.
then fastapi will verify the token and if it is correct, it will return the posts of the user.

ex: /posts with JWT token in the header

the token is created with 3 Individual pieces: header (includes metadata of the token), payload (data, sending any data to the user no confidential data), and signature (a secret key that is used to verify the token or combine the header and payload + secret key)

<!-- login user with username and password and return a JWT token -->

first user sends a mail and password to the server. then the raw password is converted to hashed password using bcrypt. then the hashed password is compared with the hashed password in the database. if the hashed password is correct, the user is logged in and a JWT token is generated.

the JWT token is sent back to the user. the user will use this token to authenticate with the API.
the user can access its posts by sending the JWT token in the header of the request.

<!-- to create a JWT token we can use python-jose library -->

pip install "python-jose[cryptography]"
python-jose is a Python implementation of the JSON Web Token (JWT) standard. it provides a simple interface to create and verify JWT tokens. and cryptography is a dependency of python-jose.

<!-- see the oauth2.py file for more details -->
