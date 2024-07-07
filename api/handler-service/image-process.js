
class ImageProcess {
    constructor(utility, imageProcessLogic) {
        this.utility = utility;
        this.imageProcessLogic = imageProcessLogic;
    }

    async handleRequest (req, res) {
        try {
            if(!req.file) {
                return this.utility.writeResponse({code: 400, msg: 'No file uploaded!'}, null, res);
            }
            const filePath = req.file.path;
            let [error, response] = await this.utility.invoker(this.imageProcessLogic.processImage(filePath));
        } catch(err) {
            return this.utility.writeResponse({ code: 500, msg: 'Failed to add ban entry!' }, null, res);
        }
    }
}

module.exports = ImageProcess;
