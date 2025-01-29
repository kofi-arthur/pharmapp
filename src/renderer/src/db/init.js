import Database from 'better-sqlite3'
import { app } from 'electron'
import { join } from 'path'

const dbPath = join(app.getPath('userData'), 'pharmapp.db')
const db = new Database(dbPath)

const createSQLTables = `
      CREATE TABLE IF NOT EXISTS medicines (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        quantity INTEGER NOT NULL,
        price REAL NOT NULL
      );
      CREATE TABLE IF NOT EXISTS sales (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        medicineName TEXT NOT NULL,
        unitPrice REAL NOT NULL,
        quantity INTEGER NOT NULL,
        price REAL NOT NULL,
        paymentMethod TEXT NOT NULL,
        dateSold DATETIME DEFAULT CURRENT_TIMESTAMP
      );
        `

export function initializeDatabase() {
  try {
    db.exec(createSQLTables)
    console.log('Tables created successfully!')
  } catch (error) {
    console.error('Error creating tables:', error)
  }
}

export default db
