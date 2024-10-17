// Create a new SQLite database or open an existing one
// const db = new sqlite3.Database(
//   './backend/mydatabase.db',
//   sqlite3.OPEN_CREATE | sqlite3.OPEN_READWRITE,
//   (err) => {
//     if (err) {
//       console.error('Error opening database:', err.message)
//     } else {
//       console.log('Connected to the database')
//     }
//   }
// )
// db.run(
//   'CREATE TABLE IF NOT EXISTS doctor(id INTEGER PRIMARY KEY, firstname TEXT NOT NULL, lastname TEXT NOT NULL, password TEXT NOT NULL)'
// )
// db.run(
//   'CREATE TABLE IF NOT EXISTS pasient ( id INTEGER PRIMARY KEY AUTOINCREMENT,doctorId INTEGER, name TEXT NOT NULL, surname TEXT NOT NULL, birthday TEXT NOT NULL, nation TEXT, gender TEXT, medicalHistory TEXT, enterDate TEXT, exitDate TEXT, testMaterial TEXT, address TEXT, section TEXT, clinicalDiagnos TEXT, FOREIGN KEY (doctorId) REFERENCES doctor(id) ON DELETE CASCADE)'
// )
// db.run(
//   'CREATE TABLE IF NOT EXISTS ph(id INTEGER PRIMARY KEY AUTOINCREMENT, pasientId INTEGER, doctorId INTEGER, value REAL, phChangeTime TEXT, FOREIGN KEY (pasientId) REFERENCES pasient(id) ON DELETE CASCADE)'
// )
// // Close the database connection when the Node.js process exits
// process.on('exit', () => {
//   db.close((err) => {
//     if (err) {
//       console.error('Error closing database:', err.message)
//     } else {
//       console.log('Closed the database connection')
//     }
//   })
// })

// module.exports = db

// const register = (req, res) => {
//   const sql = 'SELECT * FROM doctor WHERE firstname = ? and lastname = ?'
//   db.all(sql, [req.body.firstname, req.body.lastname], (err, rows) => {
//     if (err) return res.status(500).json(err)
//     if (rows[0]) return res.status(409).json('Ol atly lukman bar')
//     const sql =
//       'INSERT INTO doctor(firstname, lastname, password) VALUES(?, ?, ?)'
//     const salt = bcrypt.genSaltSync(10)
//     const hash = bcrypt.hashSync(req.body.password, salt)
//     db.run(sql, [req.body.firstname, req.body.lastname, hash], (err, rows) => {
//       if (err) return res.status(500).json(err)
//       return res.json('user added')
//     })
//   })
// }

// const login = (req, res) => {
//   const sql = 'SELECT * FROM doctor WHERE firstname= ? AND lastname = ?'
//   db.all(sql, [req.body.firstname, req.body.lastname], (err, rows) => {
//     if (err) return console.error(err.message)
//     if (!rows[0]) return res.status(404).json('Lukman tapylmady')
//     const isPasswordCorrect = bcrypt.compareSync(
//       req.body.password,
//       rows[0].password
//     )
//     if (!isPasswordCorrect) return res.status(404).json('Parol yalnysh')

//     const token = jwt.sign({ id: rows[0].id }, 'jwtkey')

//     const { password, ...other } = rows[0]

//     res
//       .cookie('accessToken', token, {
//         httpOnly: true,
//       })
//       .status(200)
//       .json(other)
//   })
// }

// const logout = (req, res) => {
//   res
//     .clearCookie('accessToken', {
//       secure: true,
//       sameSite: 'none',
//     })
//     .status(200)
//     .json('Lukman chykdy')
// }

// const allPasient = (req, res) => {
//   const sql =
//     'SELECT id, name, surname, birthday, nation, gender, medicalHistory, enterDate, exitDate, testMaterial, address, section, clinicalDiagnos FROM pasient WHERE doctorId = ?'
//   db.all(sql, [req.doctor], (err, data) => {
//     if (err) return res.status(500).json(err.message)
//     if (data.length) {
//       return res.status(200).json(data)
//     } else {
//       return res.status(200).json('No information')
//     }
//   })
// }

// const addPasient = (req, res) => {
//   const {
//     name,
//     surname,
//     birthday,
//     nation,
//     gender,
//     medicalHistory,
//     enterDate,
//     exitDate,
//     testMaterial,
//     address,
//     section,
//     clinicalDiagnos,
//   } = req.body
//   const sql =
//     'INSERT INTO pasient (doctorId, name, surname, birthday, nation, gender, medicalHistory, enterDate, exitDate, testMaterial, address, section, clinicalDiagnos, createAt, updateAt) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)'
//   db.run(
//     sql,
//     [
//       req.doctor,
//       name,
//       surname,
//       moment(birthday).format('YYYY-MM-DD HH:mm:ss'),
//       nation,
//       gender,
//       medicalHistory,
//       moment(enterDate).format('YYYY-MM-DD HH:mm:ss'),
//       moment(exitDate).format('YYYY-MM-DD HH:mm:ss'),
//       testMaterial,
//       address,
//       section,
//       clinicalDiagnos,
//       moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
//       moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
//     ],
//     (err, data) => {
//       if (err) {
//         console.log(err)
//         return res.status(500).json(err.message)
//       }
//       return res.status(200).json('pasient goshuldy')
//     }
//   )
// }
// const getPasient = (req, res, next) => {
//   const sql =
//     'SELECT id, name, surname, birthday, nation, gender, medicalHistory, enterDate, exitDate, testMaterial, address, section, clinicalDiagnos FROM pasient WHERE doctorId = ? AND id = ?'
//   db.get(sql, [req.doctor, req.params.id], (err, pasient) => {
//     if (err) return res.status(500).json(err.message)
//     if (pasient) {
//       allPhPasient(
//         { pasient: pasient.id, doctor: req.doctor },
//         (err, phValues) => {
//           if (phValues.length) {
//             res.status(200).json({
//               ...pasient,
//               latestValue: phValues[phValues.length - 1].value,
//               phValues,
//             })
//           } else {
//             res.status(200).json(pasient)
//           }
//         }
//       )
//       req.pasient = pasient.id
//       // next()
//     } else {
//       return res.status(404).json('not Found')
//     }
//   })
// }
// const updatePasient = (req, res) => {
//   const sql =
//     'UPDATE pasient SET name = ?, surname = ?, birthday = ?, nation = ?, gender = ?, medicalHistory = ?, enterDate = ?, exitDate = ?, testMaterial = ?, address = ?, section = ?, clinicalDiagnos = ?, updateAt = ? WHERE doctorId = ? AND id = ?'
//   const {
//     name,
//     surname,
//     birthday,
//     nation,
//     gender,
//     medicalHistory,
//     enterDate,
//     exitDate,
//     testMaterial,
//     address,
//     section,
//     clinicalDiagnos,
//   } = req.body
//   db.run(
//     sql,
//     [
//       name,
//       surname,
//       moment(birthday).format('YYYY-MM-DD HH:mm:ss'),
//       nation,
//       gender,
//       medicalHistory,
//       moment(enterDate).format('YYYY-MM-DD HH:mm:ss'),
//       moment(exitDate).format('YYYY-MM-DD HH:mm:ss'),
//       testMaterial,
//       address,
//       section,
//       clinicalDiagnos,
//       moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
//       req.doctor,
//       req.params.id,
//     ],
//     (err, data) => {
//       if (err) return res.status(500).json(err.message)
//       return res.status(200).json('pasient updated')
//     }
//   )
// }

// const deletePasient = (req, res) => {
//   const sql = 'DELETE FROM pasient WHERE doctorId = ? AND id = ?'
//   db.run(sql, [req.doctor, req.params.id], (err, data) => {
//     if (err) return res.status(500).json(err.message)
//     return res.status(200).json(`deleted pasient by id ${req.params.id}`)
//   })

// const allDoctor = (req, res) => {
//   const sql = 'SELECT `id`, `firstname`, `lastname` FROM `doctor`'
//   db.all(sql, [], (err, rows) => {
//     if (err) return console.error(err.message)
//     return res.status(200).json(rows)
//   })
// }

// const updateDoctor = (req, res) => {
//   console.log(req.doctor)
//   const sql =
//     'UPDATE `doctor` SET `firstname` = ? , `lastname` = ? WHERE `id`= ?'
//   db.run(
//     sql,
//     [req.body.firstname, req.body.lastname, req.doctor.id],
//     (err, rows) => {
//       if (err) return res.status(500).json(err.message)
//       return res.status(200).json('Lukmanyn maglumatlary uytgedildi')
//     }
//   )
// }
// const deleteDoctor = (req, res) => {
//   sql = 'DELETE FROM doctor WHERE id = ?'
//   db.run(sql, [req.doctor], (err) => {
//     if (err) return res.status(500).json(err.message)
//     else
//       return res
//         .status(200)
//         .clearCookie('accessToken', {
//           secure: true,
//           sameSite: 'none',
//         })
//         .json('Lukman hakyndaky maglumatlar pozuldy')
//   })
// }
// module.exports = { allDoctor, updateDoctor, deleteDoctor }
