const { Server } = require("socket.io");
const { SerialPort, ReadlineParser } = require("serialport");
const { findArduinoPort } = require("./serial");
const moment = require("moment");

const socketio = async (server) => {
  // const arduinoPort = await findArduinoPort();
  // const port = new SerialPort({ path: arduinoPort, baudRate: 115200 });
  // const serport = port.pipe(new ReadlineParser({ delimiter: "\r\n" }));
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });
  // serport.pause();
  io.on("connection", (socket) => {
    console.log(
      "A user connected",
      socket.handshake.address.replace("::ffff:", "")
    );
    socket.client.value = Math.round(Math.random() * 14);
    setInterval(() => {
      let old = socket.client.value;
      const value = old + (Math.round(Math.random() * -1 * 8) + 4) / 10;
      socket.value = value;
      socket.emit("phGet", {
        value,
        phChangeTime: moment(Date.now()).format("HH:mm"),
      });
    }, 5000);
    // serport.on("data", (data) => {
    //   // if (!serport.isPaused()) {
    //   //   socket.emit('phGet', {
    //   //     value: data,
    //   //     phChangeTime: moment(Date.now()).format('HH:mm'),
    //   //   })
    //   // }
    // });
    socket.on("start", () => {
      // if (serport.isPaused()) {
      //   serport.resume()
      // }
      // console.log('start')
      // port.write('start', (err) => {
      //   if (err) {
      //     console.log(err.message)
      //   }
      // })
    });
    socket.on("stop", () => {
      // console.log('stop')
      // serport.pause()
      // port.write('stop', (err) => {
      //   if (err) {
      //     console.log(err.message)
      //   }
      // })
    });
    socket.on("disconnect", () => {
      console.log("A user disconnected");
      // serport.write('stop')
    });
  });
};
module.exports = socketio;
