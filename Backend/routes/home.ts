import { Router } from "express";

class HomeRouter {
  router: Router;

  constructor() {
    this.router = Router();
    this.init();
  }

  private init() {
    this.router.get("/", (req, res, next) => {
      res.render("home");
    });
  }
}

export default new HomeRouter().router;
