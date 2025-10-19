-- Active: 1747447723202@@127.0.0.1@5432@my_db

SELECT upper(product_name), * FROM product;

SELECT length(product_name), * FROM product;

SELECT sum(product_price) FROM product;

SELECT avg(product_contity) FROM product;

SELECT max(product_price) FROM product;

SELECT min(product_price) FROM product;