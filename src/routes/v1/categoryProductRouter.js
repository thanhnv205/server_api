import express from "express";

import { categoryProductController } from "~/controllers/categoryProductController";
import { categoryProductValidation } from "~/validations/categoryProductValidation";

const Router = express.Router();

Router.route("/")
  .get(categoryProductController.getAllItem)
  .post(
    categoryProductValidation.createNew,
    categoryProductController.createNew
  );

// Router.route('/active')
//   .post(categoryProductValidation.active, categoryProductController.active)

Router.route("/destroy").post(
  categoryProductValidation.deleteItem,
  categoryProductController.deleteItem
);

Router.route("/:id").get(categoryProductController.getDetails).put();

export const categoryProductRoute = Router;
