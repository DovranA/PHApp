const { app, dialog, ipcMain } = require('electron')
const { SerialPort, ReadlineParser } = require('serialport')

const findArduinoPort = async () => {
  try {
    const ports = await SerialPort.list()
    for (const portInfo of ports) {
      if (portInfo.vendorId && portInfo.vendorId.includes('2341')) {
        // Adjust '2341' to match your Arduino's vendor ID
        // ipcMain.emit('show-window')
        return portInfo.path
      }
    }
    throw new Error('Arduino chatylmadyk')
  } catch (error) {
    // ipcMain.emit('hide-window')
    // dialog
    //   .showMessageBox(null, {
    //     type: 'error',
    //     title: 'error',
    //     message: error.messgae,
    //     // buttons: ['chyk'],

    //     detail: error.message,
    //   })
    //   .then(({ response }) => {
    //     console.log(response)
    //     if (response === 0) {
    //       app.quit()
    //     }
    //   })
    throw error
  }
}

const openSerialPort = async () => {
  try {
    const arduinoPort = await findArduinoPort()
    console.log('Arduino found on port:', arduinoPort)

    const port = new SerialPort({ path: arduinoPort, baudRate: 9600 })
    return port.pipe(new ReadlineParser({ delimiter: '\r\n' }))
  } catch (error) {
    console.error('Error finding Arduino:', error.message)
  }
}
module.exports = { openSerialPort, findArduinoPort }
