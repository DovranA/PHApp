const printJS = require('print-js')

document.getElementById('printButton').addEventListener('click', () => {
  electron.print()
})
