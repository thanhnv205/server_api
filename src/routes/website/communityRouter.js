import express from "express";
import { communityWebsiteController } from "~/controllers/communityWebsiteController";
import { communityWebsiteValidation } from "~/validations/communityWebsiteValidation";

const Router = express.Router();

Router.route("/")
  .get(communityWebsiteController.getAllItems)
  .post(
    communityWebsiteValidation.createNew,
    communityWebsiteController.createNew
  );

export const communityRouter = Router;
