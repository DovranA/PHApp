const {
  db,
  dbAddPasient,
  dbGetPasient,
  dbUpdatePasient,
  dbDeletePasient,
  dbAllPh,
  dbAllPasient,
  dbAddPh,
  dbTenPh,
} = require('../database/db')
const moment = require('moment')
const allPasient = (req, res) => {
  try {
    const pasients = dbAllPasient.all(req.doctor)
    if (pasients.length) {
      return res.status(200).json(pasients)
    } else {
      return res.status(200).json([])
    }
  } catch (error) {
    return res.status(500).json(error.message)
  }
}

const addPasient = (req, res) => {
  const {
    name,
    surname,
    birthday,
    nation,
    gender,
    medicalHistory,
    enterDate,
    testMaterial,
    address,
    section,
    clinicalDiagnos,
  } = req.body
  try {
    const pasient = dbAddPasient.run(
      req.doctor,
      name || 'Bellige alynmadyk',
      surname || 'Bellige alynmadyk',
      moment(birthday).format('YYYY-MM-DD HH:mm:ss'),
      nation || 'Bellige alynmadyk',
      gender || 'Bellige alynmadyk',
      medicalHistory || 'Bellige alynmadyk',
      moment(enterDate).format('YYYY-MM-DD HH:mm:ss'),
      testMaterial || 'Bellige alynmadyk',
      address || 'Bellige alynmadyk',
      section || 'Bellige alynmadyk',
      clinicalDiagnos || 'Bellige alynmadyk',
      moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
      moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    )
    if (pasient.changes !== 0) return res.status(200).json('pasient goshuldy')
    return res.status(306).json('pasient goshulmady')
  } catch (error) {
    return res.status(500).json(error.message)
  }
}
const getPasient = (req, res, next) => {
  try {
    const pasient = dbGetPasient.get(req.doctor, req.params.id)
    if (pasient) {
      const ph = dbTenPh.all(pasient.id, req.doctor)
      for (let i = 0; i < 10; i++) {
        if (!ph[i]) {
          ph[i] = { value: 0, phChangeTime: '00:00' }
        } else {
          const { value, phChangeTime } = ph[i]
          ph[i] = { value, phChangeTime: moment(phChangeTime).format('HH:mm') }
        }
      }
      ph.reverse()
      if (ph.length) {
        return res
          .status(200)
          .json({ ...pasient, latest: ph[ph.length - 1].value, ph })
      }
      req.pasient = pasient.id
    } else return res.status(404).json('not Found')
  } catch (error) {
    return res.status(500).json(error.message)
  }
}
const updatePasient = (req, res) => {
  const {
    name,
    surname,
    birthday,
    nation,
    gender,
    medicalHistory,
    enterDate,
    testMaterial,
    address,
    section,
    clinicalDiagnos,
  } = req.body
  try {
    const pasient = dbUpdatePasient.run(
      name,
      surname,
      moment(birthday).format('YYYY-MM-DD HH:mm:ss'),
      nation,
      gender,
      medicalHistory,
      moment(enterDate).format('YYYY-MM-DD HH:mm:ss'),
      testMaterial,
      address,
      section,
      clinicalDiagnos,
      moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
      req.doctor,
      req.params.id
    )
    if (pasient.changes !== 0)
      return res.status(200).json('Pasient hakyndaky maglumat uytgedildi')
    else
      return res.status(306).json('Pasient hakyndaky maglumat uytgedildilmedi')
  } catch (error) {
    return res.status(500).json(error.message)
  }
}

const deletePasient = (req, res) => {
  try {
    const pasient = dbDeletePasient.run(req.doctor, req.params.id)
    if (pasient.changes !== 0)
      return res.status(200).json(`deleted pasient by id ${req.params.id}`)
    else return res.status(306).json('Pasient pozulmady')
  } catch (error) {
    return res.status(500).json(error.message)
  }
}
const addPh = (req, res) => {
  console.log('test')
  const { id, value, time } = req.body
  console.log(req.body)
  try {
    if (value !== '') {
      const newPh = dbAddPh.run(
        id,
        req.doctor,
        value,
        moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
      )
      if (newPh.changes !== 0) return res.status(200).json(`new ph added`)
      else return res.status(306).json('Ph goshulmady')
    }
  } catch (error) {
    console.log(error.message)
    return res.status(500).json(error.message)
  }
}

const getPasientDetail = (req, res) => {
  try {
    const pasient = dbGetPasient.get(req.doctor, req.params.id)
    if (pasient) {
      const ph = dbAllPh.all(req.params.id, req.doctor)
      if (ph.length) {
        return res.status(200).json({ ...pasient, ph })
      } else {
        return res.status(200).json([])
      }
    } else {
      return res.status(404).json('maglumat yok')
    }
  } catch (error) {
    return res.status(500).json(error.message)
  }
}

module.exports = {
  allPasient,
  addPasient,
  getPasient,
  updatePasient,
  deletePasient,
  addPh,
  getPasientDetail,
}
