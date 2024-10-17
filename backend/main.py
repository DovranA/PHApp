import serial.tools.list_ports

def list_serial_ports():
    return [port for port, _, _ in sorted(serial.tools.list_ports.comports())]

def find_serial_port():
    ports = list_serial_ports()
    if not ports:
        print("No serial port found.")
        return None
    elif len(ports) == 1:
        return ports[0]
    else:
        print("Multiple serial ports found. Which one do you want to use?")
        return None

def main():
    port = find_serial_port()
    if port:
        with serial.Serial(port, 115200) as ser:
            try:
                while True:
                    print(ser.readline().decode().strip())
            except KeyboardInterrupt:
                pass

if __name__ == "__main__":
    main()
