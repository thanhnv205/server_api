import express from "express";
import { ourWorkWebsiteController } from "~/controllers/ourWorkWebsiteController";
import { ourWorkWebsiteValidation } from "~/validations/ourWorkWebsiteValidation";

const Router = express.Router();

Router.route("/")
  .get(ourWorkWebsiteController.getAllItems)
  .post(
    ourWorkWebsiteValidation.createNew,
    ourWorkWebsiteController.createNew
  );

export const ourWorkRouter = Router;
