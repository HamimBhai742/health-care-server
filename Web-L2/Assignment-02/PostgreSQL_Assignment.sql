-- Active: 1747447723202@@127.0.0.1@5432@conservation_db
--new database create
CREATE DATABASE conservation_db;

--Create table
create table rangers (
  ranger_id serial PRIMARY KEY,
  name VARCHAR(30) NOT NULL,
  region VARCHAR(50) DEFAULT 'No Region Provided'
);

create table species(
  species_id serial PRIMARY KEY,
  common_name VARCHAR(50) NOT NULL,
  scientific_name VARCHAR(50) NOT NULL,
  discovery_date DATE NOT NULL,
  conservation_status VARCHAR(30) NOT NULL CHECK (
    conservation_status IN ('Vulnerable', 'Endangered')
)
);

create table sightings(
  sighting_id serial PRIMARY KEY,
  ranger_id INT REFERENCES rangers(ranger_id),
  species_id INT REFERENCES species(species_id),
  sighting_time DATE NOT NULL,
  location VARCHAR(100) NOT NULL,
  notes TEXT
);