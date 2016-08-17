# http://abyz.co.uk/rpi/pigpio/python.html#write
import pigpio
import json


PINS_JSON = './config/pins.json'


class PinManager(object):

    def __init__(self):
        super(PinManager, self).__init__()
        self.gpio = pigpio.pi('0.0.0.0', 3000)
        self.load_json()

    def log(self, msg, num):
        try:
            dutycycle = self.gpio.get_PWM_dutycycle(num)
        except Exception as e:
            dutycycle = e
        print msg, num, self.gpio.get_mode(num), self.gpio.read(num), dutycycle

    def load_json(self):
        try:
            with open(PINS_JSON) as file_data:
                self.pins = json.load(file_data)
            print "Loaded JSON"
        except Exception as e:
            print e

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

        return output

        print('Response output:', output)

    def read_all(self):
        results = []
        for pin_num, pin_values in self.pins.items():
            data = self.pin_response(pin_num, pin_values)
            print 'Append:', data
            results.append(data)
        return results

    def read_one(self, num):
        try:
            # print self.pins
            pin_config = self.pins[num]
            return self.pin_response(num, pin_config)
        except KeyError:
            return None

    def update_value(self, num, value):
        if(value is False):
            value = 0
        elif(value is True):
            value = 1
        pin_num = int(num)
        try:
            self.pins[pin_num]
            self.gpio.set_mode(pin_num, pigpio.OUTPUT)
            self.gpio.write(pin_num, value)
            print ('Updated value', pin_num, self.gpio.read(pin_num))
            return True
        except KeyError:
            return None

    def update_dutycycles(self, data):
        try:
            for pin_num, dutycycle in data.items():
                print 'Trying to set PWM dutycycle', pin_num, dutycycle

                self.gpio.set_mode(int(pin_num), pigpio.OUTPUT)
                self.gpio.set_PWM_dutycycle(int(pin_num), dutycycle)

                self.log('UPD DC', int(pin_num))

                # Updating value in object
                self.pins[pin_num]['dutycycle'] = int(dutycycle)
            return True
        except KeyError:
            return None


class PinHttpManager(PinManager):

    def __init__(self):
        super(PinHttpManager, self).__init__()
        self.initialize_pins()

    def initialize_pins(self):
        for pin_num, pin_config in self.pins.items():
            initial = pin_config.get('initial', 'LOW')
            resistor = pin_config.get('resistor', None)
            dutycycle = pin_config.get('dutycycle', None)
            self.setup_pin(pin_num, pin_config[
                           'mode'], initial, resistor, dutycycle)

    def setup_pin(self, num, mode, initial, resistor, dutycycle):
        num = int(num)
        mode = pigpio.__getattribute__(mode)
        # initial = self.gpio.__getattribute__(initial)
        # if resistor:
        #     resistor = self.gpio.__getattribute__(resistor)
        #     self.gpio.setup(num, mode, initial=initial, pull_up_down=resistor)
        # else:
        self.gpio.set_mode(num, mode)
        self.gpio.write(num, initial)
        if(dutycycle is not None):
            self.gpio.set_PWM_dutycycle(num, dutycycle)

        self.log('STP PIN', num)
