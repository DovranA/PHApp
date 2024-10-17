const {
  db,
  dbAllDoctor,
  dbUpdateDoctor,
  dbDeleteDoctor,
} = require('../database/db')
const allDoctor = (req, res) => {
  try {
    const doctors = dbAllDoctor
    return res.status(200).json(doctors)
  } catch (error) {
    return res.status(500).json(error.message)
  }
}

const updateDoctor = (req, res) => {
  try {
    const doctor = dbUpdateDoctor.run(
      req.body.firstname,
      req.body.lastname,
      req.doctor
    )
    if (doctor.changes !== 0)
      return res.status(200).json('Lukmanyn maglumatlary uytgedildi')
    else return res.status(304).json('Lukmanyn maglumatlary uytgedildmedi')
  } catch (error) {
    return res.status(500).json(error.message)
  }
}
const deleteDoctor = (req, res) => {
  try {
    const doctor = dbDeleteDoctor.run(req.doctor)
    console.log(doctor)
    if (doctor.changes !== 0)
      return res
        .status(200)
        .clearCookie('accessToken', {
          secure: true,
          sameSite: 'none',
        })
        .json('Lukman hakyndaky maglumatlar pozuldy')
    else return res.status(304).json('Lukman hakyndaky maglumatlar pozulmady')
  } catch (error) {
    return res.status(500).json(error.message)
  }
}
module.exports = { allDoctor, updateDoctor, deleteDoctor }
