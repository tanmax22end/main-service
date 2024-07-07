class Utility {
    invoker(promise) {
        return promise
            .then(res => [ null, res ])
            .catch(error => [ error, null ]);
    }


    /**
     * Send express response
     * @param {Object} err Error object in case any
     * @param {Object} data data to be sent in response
     * @param {Object} res response object
     */
    writeResponse(err, data, res) {
        if (err) {
            res.status(err.code ? err.code : 400);
            return res.send(err.error ? err.error : err);
        }
        res.status(200);
        return res.json(data);
    }

    sendError(msg, code, res) {
        this.writeResponse({
            code: code,
            error: {
                code: code,
                msg: msg
            }
        }, null, res);
    }

}
