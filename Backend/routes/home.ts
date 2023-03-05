import { Router } from "express";

const controller = require("../controller/homeController")

class HomeRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

  private init() {
    this.router.post("/", controller.sendURL);
  }
}

export default new HomeRouter().router;
