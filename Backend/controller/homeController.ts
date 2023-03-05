const service = require("../services/HomeService")

const controller = {
  async sendURL(req, res, next) {
    try {
      const url = {...req.body}
      const result = await service.getTextFromWebPage(url);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = controller;