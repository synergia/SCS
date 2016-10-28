from flask_socketio import emit
from server import socketio
from pins import PinManager


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
    print 'Recieved pin:write', data
    result = PIN_MANAGER.update_value(data['num'], data['value'])
    if not result:
        emit('pin:write', {'message': 'Pin not found'})
    else:
        response = PIN_MANAGER.read_one(data['num'])
        emit('pin:write', response)


@socketio.on('pin:dutycycles')
def dutycycles_write(datas):
    print 'Recieved PWM data:', datas
    for data in datas:
        result = PIN_MANAGER.update_dutycycles(data['num'], data['dutycycle'])
    if not result:
        print 'UPD DC - FAIL'
        emit('pin:dutycycle', {'message': 'Pin not found'})
    else:
        print 'UPD DC - OK'
        # response = PIN_MANAGER.read_one(data['num'])
        # emit('pin:dutycycles', response)
