const BetterSqlite3Database = require('better-sqlite3')
const db = BetterSqlite3Database('mydatabase.db')
console.log('Database Connected')
db.exec(
  'CREATE TABLE IF NOT EXISTS doctor(id INTEGER PRIMARY KEY, firstname TEXT NOT NULL, lastname TEXT NOT NULL, password TEXT NOT NULL)'
)
db.exec(
  'CREATE TABLE IF NOT EXISTS pasient ( id INTEGER PRIMARY KEY AUTOINCREMENT,doctorId INTEGER, name TEXT NOT NULL, surname TEXT NOT NULL, birthday TEXT NOT NULL, nation TEXT, gender TEXT, medicalHistory TEXT, enterDate TEXT, testMaterial TEXT, address TEXT, section TEXT, clinicalDiagnos TEXT, 	createAt	TEXT, updateAt TEXT, FOREIGN KEY (doctorId) REFERENCES doctor(id) ON DELETE CASCADE)'
)
db.exec(
  'CREATE TABLE IF NOT EXISTS ph(id INTEGER PRIMARY KEY AUTOINCREMENT, pasientId INTEGER, doctorId INTEGER, value REAL, phChangeTime TEXT, FOREIGN KEY (pasientId) REFERENCES pasient(id) ON DELETE CASCADE)'
)
const dbAddDoctor = db.prepare(
  'INSERT INTO doctor(firstname, lastname, password) VALUES(?, ?, ?)'
)
const dbGetDoctor = db.prepare(
  'SELECT * FROM doctor WHERE firstname = ? and lastname = ?'
)
const dbAllDoctor = db
  .prepare('SELECT id, firstname, lastname FROM doctor')
  .all()
const dbUpdateDoctor = db.prepare(
  'UPDATE doctor SET firstname = ? , lastname = ? WHERE id = ?'
)
const dbDeleteDoctor = db.prepare('DELETE FROM doctor WHERE id = ?')
const dbAddPasient = db.prepare(
  'INSERT INTO pasient (doctorId, name, surname, birthday, nation, gender, medicalHistory, enterDate,  testMaterial, address, section, clinicalDiagnos, createAt, updateAt) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)'
)
const dbGetPasient = db.prepare(
  'SELECT id, name, surname, birthday, nation, gender, medicalHistory, enterDate, testMaterial, address, section, clinicalDiagnos FROM pasient WHERE doctorId = ? AND id = ?'
)
const dbAllPasient = db.prepare(
  'SELECT id, name, surname, birthday, nation, gender, medicalHistory, enterDate, testMaterial, address, section, clinicalDiagnos FROM pasient WHERE doctorId = ?'
)
const dbUpdatePasient = db.prepare(
  'UPDATE pasient SET name = ?, surname = ?, birthday = ?, nation = ?, gender = ?, medicalHistory = ?, enterDate = ?, testMaterial = ?, address = ?, section = ?, clinicalDiagnos = ?, updateAt = ? WHERE doctorId = ? AND id = ?'
)
const dbDeletePasient = db.prepare(
  'DELETE FROM pasient WHERE doctorId = ? AND id = ?'
)
const dbAddPh = db.prepare(
  'INSERT INTO ph(pasientId, doctorId, value, phChangeTime) VALUES(?, ?, ?, ?)'
)
const dbGetPh = db.prepare('SELECT value, phChangeTime FROM ph WHERE id = ?')
const dbAllPh = db.prepare(
  'SELECT value, phChangeTime FROM ph WHERE pasientId = ? AND doctorId = ? ORDER BY phChangeTime'
)
const dbTenPh = db.prepare(
  'SELECT value, phChangeTime FROM ph WHERE pasientId = ? AND doctorId = ? ORDER BY phChangeTime DESC LIMIT 10'
)
const dbLatestPh = db.prepare(
  'SELECT value, MAX(phChangeTime) AS phChangeTime FROM ph WHERE pasientId = ? AND doctorId = ?'
)

module.exports = {
  db,
  dbAddDoctor,
  dbGetDoctor,
  dbAllDoctor,
  dbUpdateDoctor,
  dbDeleteDoctor,
  dbAddPasient,
  dbGetPasient,
  dbAllPasient,
  dbUpdatePasient,
  dbDeletePasient,
  dbAddPh,
  dbGetPh,
  dbAllPh,
  dbLatestPh,
  dbTenPh,
}
process.on('exit', () => {
  db.close((err) => {
    if (err) {
      console.error('Error closing database:', err.message)
    } else {
      console.log('Closed the database connection')
    }
  })
})
