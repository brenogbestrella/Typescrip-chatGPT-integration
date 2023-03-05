const service = require("../services/HomeService")

const controller = {
  sendURL(req, res, next) {
    const url = {...req.body}
    service.getTextFromWebPage(url).then(() => res.status(204).send())
    .catch((err) => next(err))
  }
}

module.exports = controller;