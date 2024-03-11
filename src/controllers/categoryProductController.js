import { StatusCodes } from "http-status-codes";
import { destroyImages } from "~/middlewares/uploadImageMiddleware";
import { categoryProductService } from "~/services/categoryProductService";

const getAllItem = async (req, res, next) => {
  try {
    const products = await categoryProductService.getAllItem();
    res.status(StatusCodes.OK).json(products);
  } catch (error) {
    next(error);
  }
};

const createNew = async (req, res, next) => {
  try {
    const { slug } = req.body;
    const existingSlug = await categoryProductService.getBySlug(slug);

    if (existingSlug) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Slug đã tồn tại" });
    }

    const createdPost = await categoryProductService.createNew(req.body);

    res.status(StatusCodes.CREATED).json(createdPost);
  } catch (error) {
    next(error);
  }
};

const getDetails = async (req, res, next) => {
  try {
    const post = await categoryProductService.getDetails(req.params.id);
    res.status(StatusCodes.OK).json(post);
  } catch (error) {
    next(error);
  }
};

const deleteItem = async (req, res, next) => {
  try {
    const { listId } = req.body;
    const result = await categoryProductService.deleteItem(listId);
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
