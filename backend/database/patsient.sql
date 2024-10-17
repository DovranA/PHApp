CREATE TABLE IF NOT EXISTS pasient (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  doctorId INTEGER,
  name TEXT NOT NULL,
  surname TEXT NOT NULL,
  birthday TEXT NOT NULL,
  nation TEXT,
  gender TEXT,
  medicalHistory TEXT,
  enterDate TEXT,
  exitDate TEXT,
  testMaterial TEXT,
  address TEXT,
  section TEXT,
  clinicalDiagnos TEXT,
  FOREIGN KEY (doctorId) REFERENCES doctor(id) ON DELETE CASCADE
);
