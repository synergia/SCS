from flask_socketio import emit
from pi_gpio import socketio
from config.pins import PinManager


PIN_MANAGER = PinManager()


@socketio.on('connection')
def connection():
    print ('Connected')


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
    result = PIN_MANAGER.update_value(data.num, data.value)
    if not result:
        emit('pin:write', {'message': 'Pin not found'})
    else:
        response = PIN_MANAGER.read_one(data.num)
        emit('pin:write', response)


@socketio.on('pin:PWM')
def setPWM(data):
    print 'Recieved PWM data:', data
    result = PIN_MANAGER.setPWM(data['dutycycles'], data['dirs'])
    if not result:
        emit('pin:PWM', {'message': 'Pin not found'})
    # else:
    #     response = PIN_MANAGER.read_one(data.num)
    #     emit('pin:write', response)
