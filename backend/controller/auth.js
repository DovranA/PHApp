const { db, dbGetDoctor, dbAddDoctor } = require('../database/db')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const register = (req, res) => {
  try {
    const doctor = dbGetDoctor.get(req.body.firstname, req.body.lastname)
    if (doctor) {
      return res.status(409).json('Ol atly lukman bar')
    } else {
      try {
        const salt = bcrypt.genSaltSync(10)
        const hash = bcrypt.hashSync(req.body.password, salt)
        dbAddDoctor.run(req.body.firstname, req.body.lastname, hash)
        return res.json('doctor goshuldy')
      } catch (error) {
        return res.status(500).json(error.message)
      }
    }
  } catch (error) {
    return res.status(500).json(error.message)
  }
}

const login = (req, res) => {
  try {
    const doctor = dbGetDoctor.get(req.body.firstname, req.body.lastname)

    if (doctor) {
      const isPasswordCorrect = bcrypt.compareSync(
        req.body.password,
        doctor.password
      )
      if (!isPasswordCorrect) return res.status(404).json('Parol yalnysh')

      const token = jwt.sign({ id: doctor.id }, 'jwtkey')

      const { password, ...other } = doctor

      res
        .cookie('accessToken', token, {
          httpOnly: true,
        })
        .status(200)
        .json(other)
    } else {
      return res.status(404).json('Lukman tapylmady')
    }
  } catch (error) {
    return res.status(500).json(error.message)
  }
}

const logout = (req, res) => {
  res
    .clearCookie('accessToken', {
      secure: true,
      sameSite: 'none',
    })
    .status(200)
    .json('Lukman chykdy')
}

module.exports = { register, login, logout }
