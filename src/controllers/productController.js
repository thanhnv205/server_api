import { StatusCodes } from "http-status-codes";
import { destroyImages } from "~/middlewares/uploadImageMiddleware";
import { productService } from "~/services/productService";

const getAllItem = async (req, res, next) => {
  try {
    const products = await productService.getAllItem();
    res.status(StatusCodes.OK).json(products);
  } catch (error) {
    next(error);
  }
};

const createNew = async (req, res, next) => {
  try {
    const { slug } = req.body;
    const existingSlug = await productService.getBySlug(slug);

    if (existingSlug) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Slug đã tồn tại" });
    }

    const createdPost = await productService.createNew(req.body);

    res.status(StatusCodes.CREATED).json(createdPost);
  } catch (error) {
    next(error);
  }
};

const getDetails = async (req, res, next) => {
  try {
    const post = await productService.getDetails(req.params.id);
    res.status(StatusCodes.OK).json(post);
  } catch (error) {
    next(error);
  }
};

const deleteItem = async (req, res, next) => {
  try {
    const { listId } = req.body;
    const result = await productService.deleteItem(listId);
    destroyImages(req, res, next);
    res.status(StatusCodes.OK).json(result);
  } catch (error) {
    next(error);
  }
};

export const productController = {
  getAllItem,
  createNew,
  getDetails,
  deleteItem,
};
