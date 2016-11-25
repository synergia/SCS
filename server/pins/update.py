class Update():

    def update_value(self, num, value):
        try:
            print 'Trying to set value', num, value
            # Updating value in object
            self.pins[num]['value'] = value
            pin_num = int(num)
            self.gpio.set_mode(pin_num, pigpio.OUTPUT)
            self.gpio.write(pin_num, value)
            print ('Updated value', pin_num, self.gpio.read(pin_num))
            return True
        except KeyError as e:
            print 'Shit happened here:', e
            return None

    def update_dutycycles(self, num, dutycycle):
        try:
            print 'Trying to set PWM dutycycle', num, dutycycle

            self.gpio.set_mode(int(num), pigpio.OUTPUT)
            self.gpio.set_PWM_dutycycle(int(num), dutycycle)

            self.log('UPD DC', int(num))

            # Updating value in object
            self.pins[num]['dutycycle'] = int(dutycycle)
            return True
        except KeyError:
            return None

        def update_servo(self, num, pulsewidth):
            pass
