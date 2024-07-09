
class ConfirmationWebhook {
    constructor(utility, confirmationWebhookLogic) {
        this.utility = utility;
        this.confirmationWebhookLogic = confirmationWebhookLogic;
    }

    async handleRequest(req, res) {
        try {
            const [error, response] = await this.utility.invoker(this.confirmationWebhookLogic.updateStatus(req.body));
            if (error) {
                return this.utility.sendError('Failed to call confirmation webhook', 400, res);
            }
            return this.utility.writeResponse(null,{
                msg: 'Successfully triggered the webhook',
                data: response
            }, res);
        } catch (error) {
            return this.utility.writeResponse({ code: 500, msg: 'Failed to fetch the request status' }, null, res);
        }

    }
}
module.exports = ConfirmationWebhook
