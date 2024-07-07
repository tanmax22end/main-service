const { createContainer, asValue, asClass, InjectionMode, Lifetime } = require('awilix');
const {get} = require("mongoose");

function getScope() {
    return { lifetime: Lifetime.SINGLETON };
}

const container = createContainer({ injectionMode: InjectionMode.CLASSIC });

//-------------------LOGIC---------------------

container.register('imageProcessLogic', asClass(require('../logic/handler-logic/image-process-logic'), getScope()));

//-------------------API------------------------
container.register('imageProcessApi', asClass(require('../api/handler-service/image-process'), getScope()));

module.exports = container;
