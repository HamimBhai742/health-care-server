-- Active: 1747447723202@@127.0.0.1@5432@my_db

--find all product and order by product_id
SELECT * FROM product ORDER BY product_id ASC;

-- find single product
SELECT product_price FROM product;

-- find all product
SELECT * FROM product;

--find product by ignore doble product
SELECT DISTINCT product_price FROM product;

--filter product by product price
SELECT * FROM product WHERE product_contity > 100;

SELECT *
FROM product
WHERE
    product_price > 1000
    OR product_stock = FALSE;