from server.log import logger
import pigpio

class Update():

    def update(self, num, value, role):
        roles = {
            'servo': self.gpio.set_servo_pulsewidth,
            'propulsion': self.gpio.set_PWM_dutycycle
        }
        try:
            logger.info('Update: Trying to set %s at %s', value, num)
            num = int(num)
            # Setting mode
            self.gpio.set_mode(num, pigpio.OUTPUT)
            # If current pin role is the same role that is in `roles` object
            # than do things
            for r in roles:
                if role in roles:
                    roles[role](num, value)
                else:
                    logger.info('Trying to set %s value at %s', value, num)
                    self.gpio.write(num, value)
            logger.info('Update: %s %s value: %s', num, role, value)

            # Updating value in object
            self.pins[str(num)]['value'] = value
            return True

        except KeyError as e:
            logger.error('Update: Error: %s', e)
            return None
