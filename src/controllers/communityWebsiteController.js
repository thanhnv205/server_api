import { communityWebsiteService } from "~/services/communityWebsiteService";

const { StatusCodes } = require("http-status-codes");

const getAllItems = async (req, res, next) => {
  try {
    const communities = await communityWebsiteService.getAllItems();
    res.status(StatusCodes.OK).json(communities);
  } catch (error) {
    next(error);
  }
};

const createNew = async (req, res, next) => {
  try {
    const { slug } = req.body;
    const existingSlug = await communityWebsiteService.findBySlug(slug);

    if (existingSlug) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Slug đã tồn tại." });
    }

    const created = await communityWebsiteService.createNew(req.body);

    res.status(StatusCodes.CREATED).json(created);
  } catch (error) {
    next(error);
  }
};

export const communityWebsiteController = {
  getAllItems,
  createNew,
};
