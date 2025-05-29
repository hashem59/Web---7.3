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
/* 
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
  });
});


// create table for contact forms submissions
const createContactTableSql = `
  CREATE TABLE IF NOT EXISTS contact_forms (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    privacy INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`;

db.run(createContactTableSql, (err) => {
  if (err) {
    return console.error('Error creating contact_forms table:', err.message);
  }
  console.log('contact_forms table created or already exists.');
});
 */


// create cart table, it must, then create cart Items table, it must have a foreign key to the cart table
const createCartTableSql = `
  CREATE TABLE IF NOT EXISTS cart (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cart_id TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`;

db.run(createCartTableSql, (err) => {
  if (err) {
    return console.error('Error creating cart table:', err.message);
  }
  console.log('cart table created or already exists.');
});

// create cart items table, add last_updated_at field
const createCartItemsTableSql = `
  CREATE TABLE IF NOT EXISTS cart_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    cart_id TEXT NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    last_updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (cart_id) REFERENCES cart(cart_id)
  )
`;

db.run(createCartItemsTableSql, (err) => {
  if (err) {
    return console.error('Error creating cart_items table:', err.message);
  }
  console.log('cart_items table created or already exists.');
});