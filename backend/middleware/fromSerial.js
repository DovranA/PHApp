const { SerialPort, ReadlineParser } = require('serialport')
const { dbAddPh, dbGetPh } = require('../database/db')
const moment = require('moment')
const io = require('socket.io-client')
const { openSerialPort, arduino } = require('../serial')
// const server = io('http://localhost:8001')
let switcher = false
const fromSerial = async (req, res) => {
  const { pasient, doctor } = req
  const value = 7.2
  const now = moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
  try {
    parser.on('data', (data) => {
      console.log(data)
    })
  } catch (error) {
    console.log(error)
  }
}

const closeSerialPort = async (req, res) => {
  if (switcher) {
    arduino.write('switch', (err) => {
      switcher = true
      if (err) {
        console.log(err.message)
      }
      console.log('first')
    })
  }
}

module.exports = { fromSerial, closeSerialPort }
