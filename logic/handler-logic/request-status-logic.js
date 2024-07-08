class RequestStatusLogic {
    constructor(requestInfoRepo) {
        this.requestInfoRepo = requestInfoRepo;
    }

    async currentStatus(query) {
        const status = await this.requestInfoRepo.get(query.id, 'status');
        return {currentStatus: status};
    }
}

module.exports = RequestStatusLogic
