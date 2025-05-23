/* const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs'); */

import sqlite3 from 'sqlite3';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// Path to the database file
const dbPath = path.join(__dirname, 'myStoreDB');

// Open (or create) the database
let db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    return console.error('Error opening database:', err.message);
  }
  console.log('Connected to the myStoreDB SQlite database.');
});

// Read products from JSON file
const products = JSON.parse(fs.readFileSync(path.join(__dirname, 'products.json'), 'utf8'));

// Create products table
const createTableSql = `
  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    slug TEXT,
    category TEXT,
    name TEXT,
    price REAL,
    pricePer TEXT,
    image TEXT,
    thumbnails TEXT,
    rating REAL,
    reviews INTEGER,
    notes TEXT,
    description TEXT,
    details TEXT
  )
`;
db.run(createTableSql, (err) => {
  if (err) {
    return console.error('Error creating table:', err.message);
  }
  console.log('Products table created or already exists.');

  // Insert products
  const insertSql = `
    INSERT INTO products (
      slug, category, name, price, pricePer, image, thumbnails, rating, reviews, notes, description, details
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;
  const stmt = db.prepare(insertSql);

  products.forEach((product) => {
    stmt.run(
      product.slug,
      product.category,
      product.name,
      product.price,
      product.pricePer,
      JSON.stringify(product.image),
      JSON.stringify(product.thumbnails),
      product.rating,
      product.reviews,
      JSON.stringify(product.notes),
      product.description,
      JSON.stringify(product.details)
    );
  });

  stmt.finalize((err) => {
    if (err) {
      return console.error('Error finalizing statement:', err.message);
    }
    console.log('All products inserted successfully.');
    db.close();
  });
});

// let's read all products
db.all("SELECT * FROM products", (err, rows) => {
  if (err) {
    return console.error('Error reading products:', err.message);
  }
  console.log('Products:', rows);
});

