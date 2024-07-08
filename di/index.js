const { createContainer, asValue, asClass, InjectionMode, Lifetime } = require('awilix');

const config = require('../config/config');
const serverConfig = require('../config/server-config');
const util = require('../util');

function getScope() {
    return { lifetime: Lifetime.SINGLETON };
}

const container = createContainer({ injectionMode: InjectionMode.CLASSIC });

container.register({
    //------------------ CONFIG ------------------------
    config: asValue(config),
    serverConfig: asValue(serverConfig),

    //------------------ UTILITY -----------------------
    utility: asClass(util.Utility, getScope()),
    validationSchemas: asValue(util.validationSchemas),

});


container.register('imageProcessModel', asValue(require('../repository/data/models/image-process-model')));
container.register('requestInfoModel', asValue(require('../repository/data/models/request-info-model')));


container.register('imageProcessRepo', asClass(require('../repository/data/image-process-repo')));
container.register('requestInfoRepo', asClass(require('../repository/data/request-info-repo')));


//-------------------LOGIC---------------------

container.register('imageProcessLogic', asClass(require('../logic/handler-logic/image-process-logic'), getScope()));
container.register('requestStatusLogic', asClass(require('../logic/handler-logic/request-status-logic'), getScope()));
container.register('imageCompressLogic', asClass(require('../logic/image-processing-logic/image-compress-logic'),getScope()));

//-------------------API------------------------
container.register('imageProcessApi', asClass(require('../api/handler-service/image-process'), getScope()));
container.register('imageCompressApi', asClass(require('../api/image-processing-service/image-compress-api'), getScope()));
container.register('requestStatusApi', asClass(require('../api/handler-service/request-status-api'), getScope()));

module.exports = container;
