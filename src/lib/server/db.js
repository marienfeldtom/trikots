import Database from 'better-sqlite3';

const db = new Database('trikots.db');

// Create table
db.exec(`
  CREATE TABLE IF NOT EXISTS items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    type TEXT NOT NULL,
    size TEXT NOT NULL,
    number INTEGER,
    gender TEXT NOT NULL,
    condition TEXT NOT NULL DEFAULT 'Wie neu',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )
`);

export const getItems = () => db.prepare('SELECT * FROM items ORDER BY number ASC').all();

export const addItem = (item) => {
  const stmt = db.prepare('INSERT INTO items (type, size, number, gender, condition) VALUES (@type, @size, @number, @gender, @condition)');
  return stmt.run(item);
};

export const deleteItem = (id) => db.prepare('DELETE FROM items WHERE id = ?').run(id);

export const getSets = () => {
  // A set is White T-Shirt + Black Shorts with same size, number, and gender
  // For simplicity, we ignore condition in set matching, but we could return it if needed.
  return db.prepare(`
        SELECT 
            t.gender, t.size, t.number, 
            t.id as shirt_id, s.id as shorts_id,
            t.type as shirt_type, s.type as shorts_type,
            t.condition as shirt_condition, s.condition as shorts_condition
        FROM items t
        JOIN items s ON 
            t.gender = s.gender AND 
            t.size = s.size AND 
            t.number = s.number
        WHERE 
            t.type = 'T-Shirt weiß' AND 
            s.type = 'kurze Hose'
        ORDER BY t.number ASC
    `).all();
};
