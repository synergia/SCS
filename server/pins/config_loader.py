import json

PINS_JSON = './config/pins.json'

class ConfigLoader():
    def load_json(self):
        try:
            with open(PINS_JSON) as file_data:
                self.pins = json.load(file_data)
            print "Loaded JSON"
            print self.pins
        except Exception as e:
            print e
