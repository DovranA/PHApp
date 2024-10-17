const express = require('express')
const {
  allPasient,
  addPasient,
  getPasient,
  updatePasient,
  deletePasient,
  addPh,
  getPasientDetail,
} = require('../controller/pasient')
const { verifyToken } = require('../middleware/verifyToken')
const router = express.Router()

router.get('/', verifyToken, allPasient)
router.get('/all/:id', verifyToken, getPasientDetail)
router.post('/', verifyToken, addPasient)
router.post('/ph', verifyToken, addPh)
router.get('/:id', verifyToken, getPasient)
router.put('/:id', verifyToken, updatePasient)
router.delete('/:id', verifyToken, deletePasient)

module.exports = router
