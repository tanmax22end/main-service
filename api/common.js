
const internalCheckMiddleware = (req, res, next) => {
    if (req.locals.isInternal) {
        return next();
    }
    return res.status(404).send('Not found');
};


module.exports = {
    internalCheckMiddleware: internalCheckMiddleware
};
