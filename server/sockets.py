from flask_socketio import emit
from server import socketio
from pins import PIN_MANAGER
from server.log import logger


@socketio.on('connection')
def connection():
    pass

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
    logger.debug('Recieved pin:write', data)
    result = PIN_MANAGER.update_value(data['num'], data['value'])
    if not result:
        emit('pin:write', {'message': 'Pin not found'})
    else:
        response = PIN_MANAGER.read_one(data['num'])
        emit('pin:write', response)


@socketio.on('pin:dutycycles')
def dutycycles_write(datas):
    logger.debug('Recieved PWM data')
    logger.debug(datas)

    datas_dict = []
    datas_dict.append(datas)

    for data in datas_dict:
        result = PIN_MANAGER.update(data['num'], data['value'], data['role'])
    if not result:
        logger.error( 'UPD DC - FAIL')
        emit('pin:dutycycle', {'message': 'Pin not found'})
    else:
        logger.info('UPD DC - OK')
        # response = PIN_MANAGER.read_one(data['num'])
        # emit('pin:dutycycles', response)
