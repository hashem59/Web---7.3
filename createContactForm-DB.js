import sqlite3 from 'sqlite3';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dbPath = path.join(__dirname, 'myStoreDB');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    return console.error('Error opening database:', err.message);
  }
  console.log('Connected to the myStoreDB SQlite database.');
});

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
  db.close();
});
