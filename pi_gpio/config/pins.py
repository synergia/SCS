# http://abyz.co.uk/rpi/pigpio/python.html#write
import pigpio
import yaml


PINS_YML = './config/pins.yml'


class PinManager(object):

    def __init__(self):
        super(PinManager, self).__init__()
        self.gpio = pigpio.pi('0.0.0.0', 3000)
        self.load_yaml()

    def load_yaml(self):
        with open(PINS_YML) as file_data:
            self.pins = yaml.safe_load(file_data)

    def pin_response(self, num, config):
        output = {
            'num': num,
            'name': config.get('name', ''),
            'mode': config['mode'],
            'value': self.gpio.read(num),
        }
        resistor = config.get('resistor', None)
        if resistor:
            output['resistor'] = resistor

        initial = config.get('initial', None)
        if initial:
            output['initial'] = initial

        dutycycle = config.get('dutycycle', None)
        if dutycycle:
            output['dutycycle'] = dutycycle

        return output

        print('Response output:', output)

    def read_all(self):
        results = []
        for pin_num, pin_config in self.pins.items():
            data = self.pin_response(pin_num, pin_config)
            print 'Append:', data
            results.append(data)
        return results

    def read_one(self, num):
        pin_num = int(num)
        try:
            pin_config = self.pins[pin_num]
            return self.pin_response(pin_num, pin_config)
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

    def update_dutycycle(self, num, dutycycle):
        print 'Trying to set PWM dutycycle', num, dutycycle
        pin_num = int(num)
        try:
            self.pins[pin_num]
            self.gpio.set_mode(pin_num, pigpio.OUTPUT)
            self.gpio.set_PWM_dutycycle(pin_num, dutycycle)

            print 'UPD dc', num, self.gpio.get_mode(num), self.gpio.read(num), self.gpio.get_PWM_dutycycle(num)

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
            self.setup_pin(pin_num, pin_config['mode'], initial, resistor, dutycycle)

    def setup_pin(self, num, mode, initial, resistor, dutycycle):
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
            print 'STP PWM', num, self.gpio.get_mode(num), self.gpio.read(num), self.gpio.get_PWM_dutycycle(num)

        print 'Setup:', num, mode, initial, dutycycle
