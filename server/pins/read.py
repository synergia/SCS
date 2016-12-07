from server.log import logger

class Read():

    def read_config(self):
        res = {
            'architecture': self.architecture,
            'pins': self.pins
        }
        logger.info('Assembling response: config')
        logger.debug(res)

        return res

    def pin_response(self, num, config):
        output = {
            'num': num,
            'name': config.get('name', ''),
            'mode': config['mode'],
            'value': self.gpio.read(int(num)),
        }
        resistor = config.get('resistor', None)
        if resistor:
            output['resistor'] = resistor

        initial = config.get('initial', None)
        if initial:
            output['initial'] = initial

        dutycycle = config.get('dutycycle', None)
        if dutycycle is not None:
            output['dutycycle'] = dutycycle

        owner = config.get('owner', None)
        if owner is not None:
            output['owner'] = owner

        return output

        logger.debug('Response output:', output)

    def read_all(self):
        results = []
        for pin_num, pin_values in self.pins.items():
            data = self.pin_response(pin_num, pin_values)
            logger.debug('Append:', data)
            results.append(data)
        return results

    def read_one(self, num):
        try:
            # print self.pins
            pin_config = self.pins[num]
            return self.pin_response(num, pin_config)
        except KeyError:
            return None
