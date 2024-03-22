import express from "express";
import { menuWebsiteController } from "~/controllers/menuWebsiteController";
import { menuWebsiteValidation } from "~/validations/menuWebsiteValidation";

const Router = express.Router();

Router.route("/")
  .get(menuWebsiteController.getAllItems)
  .post(menuWebsiteValidation.createNew, menuWebsiteController.createNew);

export const menuRouter = Router;
