
class RequestStatusApi {
    constructor(requestStatusLogic, utility) {
        this.utility = utility;
        this.requestStatusLogic = requestStatusLogic;
    }

    async handleRequest(req,res) {
        try {
            console.log('params', req.params);
            let [error, response] = await this.utility.invoker(this.requestStatusLogic.currentStatus(req.params));
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
