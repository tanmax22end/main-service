 class ConfirmationWebhookLogic {
    constructor(requestInfoRepo) {
        this.requestInfoRepo = requestInfoRepo;
    }

    async updateStatus(value) {
        const updateObj = {
            status: value.status
        }
        const updatedRes = await this.requestInfoRepo.update(value.requestId, updateObj);
        return updatedRes;
    }
 }

 module.exports = ConfirmationWebhookLogic;
