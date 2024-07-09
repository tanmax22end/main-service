
class RequestStatusApi {
    constructor(requestStatusLogic, utility) {
        this.utility = utility;
        this.requestStatusLogic = requestStatusLogic;
    }

    async handleRequest(req,res) {
        try {
            let [error, response] = await this.utility.invoker(this.requestStatusLogic.currentStatus(req.params));
            if (error) {
                return this.utility.sendError('Failed to fetch request status', 400, res);
            }
            return this.utility.writeResponse(null,{
                msg: 'Successfully fetched current status',
                data: response
            }, res);
        } catch(error) {
            return this.utility.writeResponse({ code: 500, msg: 'Failed to fetch the request status' }, null, res);
        }
    }
}

module.exports = RequestStatusApi;
