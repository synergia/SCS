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
    # pass
    global thread
    print('Client connected')

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
        self.kpx = 8
        self.kdx = 2
        self.prev_errorx = 0

        self.kpy = 8
        self.kdy = 2
        self.prev_errory = 0

        self.delay = 0.05
        self.step = 10
        super(AccelerometerThread, self).__init__()
        logger.info("Thread")

    def stabilization(self, xdata=[], ydata=[]):
        xmean = 0
        ymean = 0
        while not thread_stop_event.isSet():
            acc_data = mpu.get_accel_data()
            if len(xdata) is not 5:
                xdata.append(acc_data["x"])
                ydata.append(acc_data["y"])
                # print "X:", math.asin(acc_data["x"]/9.8)*180/3.14
                # print "Y:", math.asin(acc_data["y"]/9.8)*180/3.14
            else:
                xdata.pop(0)
                ydata.pop(0)
                xdata.append(acc_data["x"])
                ydata.append(acc_data["y"])
                xmean = (xdata[0] + xdata[1] + xdata[2] +
                         xdata[3] + xdata[4]) / len(xdata)
                ymean = (ydata[0] + ydata[1] + ydata[2] +
                         ydata[3] + ydata[4]) / len(ydata)
                print "X mean:", xmean
                print "Y mean:", ymean
            # print acc_data["x"]
            self.stabilizeX(xmean)
            self.stabilizeY(ymean)
            self.sendAccData(acc_data)
            time.sleep(self.delay)

    def stabilizeX(self, accx):
        error = 0.5 - accx
        proportional = error * self.kpx
        deriv = self.kdx * (error - self.prev_errorx)
        self.prev_errorx = error
        control = int(round(proportional + deriv))
        if (abs(error) < 0.3) and (abs(self.prev_errorx) < 0.3):
            control = 0
        print error, control

        if (PIN_MANAGER.pins["5"]["value"] + control) > PIN_MANAGER.pins["5"]["max"]:
            control = PIN_MANAGER.pins["5"][
                "max"] - PIN_MANAGER.pins["5"]["value"]
        elif (PIN_MANAGER.pins["5"]["value"] + control) < PIN_MANAGER.pins["5"]["min"]:
            control = PIN_MANAGER.pins["5"][
                "min"] - PIN_MANAGER.pins["5"]["value"]

        PIN_MANAGER.update(5, PIN_MANAGER.pins["5"][
                           "value"] + control, "servo")

    def stabilizeY(self, accy):
        error = -0.5 + accy
        proportional = error * self.kpy
        deriv = self.kdy * (error - self.prev_errory)
        self.prev_errory = error
        control = int(round(proportional + deriv))
        if (abs(error) < 0.3) and (abs(self.prev_errory) < 0.3):
            control = 0
        print error, control

        if (PIN_MANAGER.pins["25"]["value"] + control) > PIN_MANAGER.pins["25"]["max"]:
            control = PIN_MANAGER.pins["25"][
                "max"] - PIN_MANAGER.pins["25"]["value"]
        elif (PIN_MANAGER.pins["25"]["value"] + control) < PIN_MANAGER.pins["25"]["min"]:
            control = PIN_MANAGER.pins["25"][
                "min"] - PIN_MANAGER.pins["25"]["value"]

        PIN_MANAGER.update(25, PIN_MANAGER.pins["25"][
                           "value"] + control, "servo")

    def run(self):
        self.stabilization()

    def mean(self, acc_data):
        xdata = []
        ydata = []
        if len(xdata) is not 5:
            xdata.append(acc_data["x"])
            ydata.append(acc_data["y"])
            # print "X:", math.asin(acc_data["x"]/9.8)*180/3.14
            # print "Y:", math.asin(acc_data["y"]/9.8)*180/3.14
        else:
            xdata.pop(0)
            ydata.pop(0)
            xdata.append(acc_data["x"])
            ydata.append(acc_data["y"])
            xmean = (xdata[0] + xdata[1] + xdata[2] +
                     xdata[3] + xdata[4]) / len(xdata)
            ymean = (ydata[0] + ydata[1] + ydata[2] +
                     ydata[3] + ydata[4]) / len(ydata)
            print "X:", xdata, "X mean:", xmean
            print "Y:", ydata, "Y mean:", ymean
            return [xmean, ymean]
        # print xdata, ydata

    def sendAccData(self, data):
        socketio.emit('accelerometer', data)
