from flask_socketio import emit
from server import socketio
from pins import PIN_MANAGER
from server.log import logger
from mpu9150 import MPU9150
import time
import math
from threading import Thread, Lock, Event, Timer
mpu = MPU9150(0x68)


@socketio.on('connection')
def connection():
    global thread
    print('Client connected')

    # Start the random number generator thread only if the thread has not been
    # started before.
    if not thread.isAlive():
        print "Starting Thread"
        thread = AccelerometerThread()
        thread.start()

# @socketio.on('accelorometr')
# def accelorometr():
#     emit('accelorometr', mpu.get_accel_data())


@socketio.on('config')
def config():
    response = PIN_MANAGER.read_config()
    emit('config', response)


@socketio.on('pin:list')
def pin_list():
    response = PIN_MANAGER.read_all()
    emit('pin:list', response)


@socketio.on('pin:read')
def pin_read(data):
    response = PIN_MANAGER.read_one(data.num)
    emit('pin:read', response)


@socketio.on('pin:write')
def pin_write(data):
    result = PIN_MANAGER.update_value(data['num'], data['value'])
    if not result:
        emit('pin:write', {'message': 'Pin not found'})
    else:
        response = PIN_MANAGER.read_one(data['num'])
        emit('pin:write', response)


@socketio.on('pin:dutycycles')
def dutycycles_write(datas):
    if type(datas) is not list:
        datas_dict = []
        datas_dict.append(datas)
        datas = datas_dict
    logger.debug(datas)

    for data in datas:
        result = PIN_MANAGER.update(data['num'], data['value'], data['role'])
        if not result:
            logger.error('UPD DC - FAIL')
            emit('pin:dutycycle', {'message': 'Pin not found'})
        else:
            logger.info('UPD DC - OK')
            # response = PIN_MANAGER.read_one(data['num'])
            # emit('pin:dutycycles', response)

# random number Generator Thread
thread = Thread()
thread_stop_event = Event()


class AccelerometerThread(Thread):

    def __init__(self):
        self.delay = 0.1
        super(AccelerometerThread, self).__init__()
        logger.info("Thread")

    def stabilization(self, xdata=[], ydata=[]):
        anglex = ""
        angley = ""
        while not thread_stop_event.isSet():
            acc_data = mpu.get_accel_data()
            # mean =  self.mean(acc_data)
            # print acc_data

            if (abs(acc_data["y"]) < 9.8115):
                angley = -math.asin(acc_data["y"] / 9.8115) * 180 / 3.14
            else:
                logger.warn("OVERLOAD %s", acc_data)
            if (abs(acc_data["x"]) < 9.8115):
                anglex = math.asin(acc_data["x"] / 9.8115) * 180 / 3.14
                # print "X",anglex, "Y",angley
            else:
                print "OVERLOAD", acc_data
            self.stabilizeX(anglex)
            self.stabilizeY(angley)
            self.sendAccData(acc_data)
            time.sleep(self.delay)

    def stabilizeX(self, anglex):
        if abs(anglex) > 5:
            if anglex > 0:
                PIN_MANAGER.update(5, PIN_MANAGER.pins["5"]["value"]-6, "servo")
                # print "update > 0"
            elif anglex < 0:
                PIN_MANAGER.update(5, PIN_MANAGER.pins["5"]["value"]+6, "servo")
                # print "update < 0"

    def stabilizeY(self, angley):
        if abs(angley) > 5:
            if angley > 0:
                PIN_MANAGER.update(25, PIN_MANAGER.pins["25"]["value"]-6, "servo")
                # print "update > 0"
            elif angley < 0:
                PIN_MANAGER.update(25, PIN_MANAGER.pins["25"]["value"]+6, "servo")
                # print "update < 0"


    def run(self):
        self.stabilization()

    def mean(self, acc_data):
        xdata = []
        ydata = []
        if len(xdata) is not 3:
            xdata.append(math.asin(acc_data["x"] / 9.8) * 180 / 3.14)
            ydata.append(math.asin(acc_data["y"] / 9.8) * 180 / 3.14)
            # print "X:", math.asin(acc_data["x"]/9.8)*180/3.14
            # print "Y:", math.asin(acc_data["y"]/9.8)*180/3.14
        else:
            xdata.pop(0)
            ydata.pop(0)
            xdata.append(math.asin(acc_data["x"] / 9.8) * 180 / 3.14)
            ydata.append(math.asin(acc_data["y"] / 9.8) * 180 / 3.14)
            xmean = (xdata[0] + xdata[1] + xdata[2]) / len(xdata)
            ymean = (ydata[0] + ydata[1] + ydata[2]) / len(ydata)
            print "X:", xdata, "X mean:", (xdata[0] + xdata[1] + xdata[2]) / len(xdata)
            print "Y:", ydata, "Y mean:", (ydata[0] + ydata[1] + ydata[2]) / len(ydata)
            return [xmean, ymean]
        # print xdata, ydata

    def sendAccData(self, data):
        socketio.emit('accelerometer', data)
