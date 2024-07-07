
const express = require('express');
const bodyparser = require('body-parser');
const helmet = require('helmet');

const cors = require('cors');

const router = require('./api/masterRouter');

const server = (container) => {
    const app = express();

    process.on('SIGINT', () => {
        process.exit(0);
    });

    app.use(bodyparser.urlencoded({
        extended: true
    }));
    // parse application/json
    app.use(bodyparser.json({
        limit: '10mb',
        strict: false
    }));

    app.use(bodyparser.raw({ type: 'application/octet-stream' }));

    app.use(cors());
    app.use(helmet());

    app.use((req, res, next) => {
        req.container = container.createScope();
        next();
    });

    app.use('/public/', (req, res, next) => {
        req.locals = { isInternal: true };
        next();
    }, router);

    return app;
}

module.exports = server;
