CREATE TABLE IF NOT EXISTS ph(
id INTEGER PRIMARY KEY AUTOINCREMENT,
pasientId INTEGER,
doctorId INTEGER,
value REAL,
phChangeTime TEXT,
FOREIGN KEY (pasientId) REFERENCES pasient(id) ON DELETE CASCADE);
