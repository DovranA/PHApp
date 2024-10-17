const express = require('express')
const {
  allDoctor,
  updateDoctor,
  deleteDoctor,
} = require('../controller/doctor.js')
const { verifyToken } = require('../middleware/verifyToken.js')
const router = express.Router()

router.get('/', allDoctor)
router.get('/test', verifyToken, (req, res) => {
  return res.status(200).json(req.doctor)
})
router.put('/', verifyToken, updateDoctor)
router.delete('/', verifyToken, deleteDoctor)

module.exports = router
