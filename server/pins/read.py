from server.log import logger


class Read():

    def read_config(self):
        res = []
        pins = {'pins': []}
        arch = {'architecture': self.architecture}
        vname = {'vehiclename': self.vehiclename}
        inver = {'inversion': self.inversion}
        logger.info('Read: assembling response: config')
        for pin_num, pin_values in self.pins.items():
            data = self.pin_response(pin_num, pin_values)
            pins['pins'].append(data)
        res.append(pins)
        res.append(arch)
        res.append(vname)
        res.append(inver)
        logger.info('Read: assembled response: config')
        logger.debug(res)
        return res

    def pin_response(self, num, pin_values):
        output = {
            'num': num,
            'name': pin_values.get('name', ''),
            'mode': pin_values['mode'],
            'role': pin_values['role'],
            'value': pin_values['value'],
        }
        owner = pin_values.get('owner', None)
        if owner is not None:
            output['owner'] = owner

        max_value = pin_values.get('max', None)
        if max_value is not None:
            output['max'] = max_value

        min_value = pin_values.get('min', None)
        if min_value is not None:
            output['min'] = min_value
        return output

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
