CREATE TABLE product (
  sku int PRIMARY KEY NOT NULL,
  name varchar(255) NOT NULL
);

CREATE TABLE warehouse (
  id  SERIAL PRIMARY KEY,
  locality varchar(50) NOT NULL,
  quantity int NOT NULL,
  type smallint NOT NULL,
  product_sku int NOT NULL
);

ALTER TABLE warehouse ADD FOREIGN KEY (product_sku) REFERENCES product (sku);
