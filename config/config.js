
const allConfig = {
    database: {
        mongoDB: {
            connStr: process.env.MONGO_URI
        }
    },
    services: {
        handlerService: {
            url: 'http://localhost:3000/public/handler-service/webhook/confirmation'
        },
        imageProcessingService: {
            url: 'http://localhost:3000/public/image-processing-service/image-compress'
        }
    }
}

module.exports = allConfig;
