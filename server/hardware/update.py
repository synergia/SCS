from server.log import logger
import pigpio

class Update():

    def update(self, num, value, role, mode = None):

        roles = {
            'servo': self.gpio.set_servo_pulsewidth,
            'heartbeat': self.gpio.set_servo_pulsewidth,
            'propulsion': self.gpio.set_PWM_dutycycle
        }
        try:
            logger.info('Update: Trying to set %s at %s', value, num)
            num = int(num)
            # Setting mode
            if mode:
                mode = pigpio.__getattribute__(mode)
                self.gpio.set_mode(num, mode)
            # If current pin role is the same role that is in `roles` object
            # than do things
            for r in roles:
                if role in roles:
                    roles[role](num, value)
                else:
                    self.gpio.write(num, value)
            logger.info('Update: %s %s value: %s mode: %s', num, role, value, mode)

            # Updating value in object
            self.pins[str(num)]['value'] = value
            return True

        except KeyError as e:
            logger.error('Update: Error: %s', e)
            return None
