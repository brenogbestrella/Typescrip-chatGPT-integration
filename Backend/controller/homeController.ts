const service = require("../services/HomeService")
import dotenv from "dotenv";
dotenv.config();

const controller = {
  async sendURL(req, res, next) {
    try {

      const data = {...req.body}
      const envPassword = process.env.OPENAI_API_PASSWORD;

      if ( data.password === envPassword) {
        const result = await service.getTextFromWebPage(data.url);
        res.status(200).json(result);
      } else {
        throw new Error ("Invalid Password!")
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = controller;