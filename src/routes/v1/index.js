import express from "express";
import { StatusCodes } from "http-status-codes";
import { postRoute } from "./postRoute";
import { categoryPostRoute } from "./categoryPostRouter";
import { productRoute } from "./productRouter";

const Router = express.Router();

Router.get("/status", (req, res) => {
  res.status(StatusCodes.OK).json({ message: "APIs v1 are ready to use" });
});

// apis
Router.use("/posts", postRoute);
Router.use("/category-posts", categoryPostRoute);
Router.use("/products", productRoute);

export const APIs_V1 = Router;
