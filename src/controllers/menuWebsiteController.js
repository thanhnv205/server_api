import { menuWebsiteService } from "~/services/menuWebsiteService";

const { StatusCodes } = require("http-status-codes");

const getAllItems = async (req, res, next) => {
  try {
    const menus = await menuWebsiteService.getAllItems();
    res.status(StatusCodes.OK).json(menus);
  } catch (error) {
    next(error);
  }
};

const createNew = async (req, res, next) => {
  try {
    const { slug } = req.body;
    const existingSlug = await menuWebsiteService.findBySlug(slug);

    if (existingSlug) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Slug đã tồn tại." });
    }

    const created = await menuWebsiteService.createNew(req.body);

    res.status(StatusCodes.CREATED).json(created);
  } catch (error) {
    next(error);
  }
};

export const menuWebsiteController = {
  getAllItems,
  createNew,
};
