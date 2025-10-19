-- Active: 1747447723202@@127.0.0.1@5432@my_db

SELECT * FROM product;

ALTER TABLE product ADD COLUMN email VARCHAR(25) UNIQUE;

ALTER Table product RENAME COLUMN stock to product_stock;

ALTER Table product
alter COLUMN product_description type VARCHAR(100);

alter table product
alter COLUMN email
set DEFAULT 'mdhamim@gmail.com';

ALTER Table product DROP COLUMN email;

ALTER Table product
ADD constraint product_name_unique UNIQUE (product_name);

ALTER TABLE product DROP CONSTRAINT product_name_unique;