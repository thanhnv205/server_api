import express from "express";
import { menuRouter } from "./menuRouter";
import { communityRouter } from "./communityRouter";
import { ourWorkRouter } from "./ourWorkRouter";

const Router = express.Router();

// apis
Router.use("/menus", menuRouter);
Router.use("/community", communityRouter);
Router.use("/our-work", ourWorkRouter);

export const APIs_website = Router;
