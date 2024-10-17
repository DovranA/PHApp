const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next) => {
  const token = req.cookies.accessToken
  if (token) {
    jwt.verify(token, 'jwtkey', (err, doctor) => {
      if (err) res.status(401).json('Token yalnysh')
      req.doctor = doctor.id
      next()
    })
  } else {
    return res.status(401).json('Lukman icheri girmedik')
  }
}

module.exports = { verifyToken }
