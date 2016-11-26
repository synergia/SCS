import pigpio
from server.log import logger

class Setup():

    def setup_pin(self, num, name, mode, initial, resistor, dutycycle):
        num = int(num)
        mode = pigpio.__getattribute__(mode)
        # initial = self.gpio.__getattribute__(initial)
        # if resistor:
        #     resistor = self.gpio.__getattribute__(resistor)
        #     self.gpio.setup(num, mode, initial=initial, pull_up_down=resistor)
        # else:
        self.gpio.set_mode(num, mode)
        if(name == 'servo'):
            self.gpio.set_servo_pulsewidth(num, initial)
        else:
            self.gpio.write(num, initial)
        if(dutycycle is not None):
            self.gpio.set_PWM_dutycycle(num, dutycycle)

        logger.info('Setup pin: %s-%s initial: %s dc: %s mode: %s', num, name, initial, dutycycle, mode)
