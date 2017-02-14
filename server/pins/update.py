from server.log import logger
import pigpio

class Update():

    def update_value(self, num, value):
        try:
            logger.info('Trying to set value', num, value)
            # Updating value in object
            self.pins[num]['value'] = value
            pin_num = int(num)
            self.gpio.set_mode(pin_num, pigpio.OUTPUT)
            self.gpio.write(pin_num, value)
            logger.info ('Updated value', pin_num, self.gpio.read(pin_num))
            return True
        except KeyError as e:
            logger.error('Fuckup at update value:', e)
            return None

    def update_dutycycles(self, num, value):
        try:
            logger.info('Trying to set value', num, value)

            self.gpio.set_mode(int(num), pigpio.OUTPUT)
            self.gpio.set_PWM_dutycycle(int(num), dutycycle)

            # Updating value in object
            self.pins[num]['value'] = value

            logger.info ('Updated value', pin_num, self.gpio.read(pin_num))
            return True
        except KeyError as e:
            logger.error('Fuckup at update value:', e)
            return None


    def update_servo(self, num, pulsewidth):
        try:
            logger.info('Trying to set value', num, pulsewidth)

            self.gpio.set_mode(int(num), pigpio.OUTPUT)
            self.gpio.set_servo_pulsewidth(int(num), pulsewidth)

            # Updating value in object
            self.pins[num]['value'] = pulsewidth

            logger.info ('Updated value', int(num), self.gpio.read(int(num)))
            return True
        except KeyError as e:
            logger.error('Fuckup at update value:', e)
            return None
        pass
