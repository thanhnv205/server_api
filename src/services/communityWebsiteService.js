import { communityWebsiteModel } from "~/models/communityWebsiteModel";
import { slugify } from "~/utils/formatters";

const getAllItems = async () => {
  try {
    return await communityWebsiteModel.getAllItems();
  } catch (error) {
    return error;
  }
};

const findBySlug = async (slug) => {
  try {
    return await communityWebsiteModel.findBySlug(slug);
  } catch (error) {
    return error;
  }
};

const createNew = async (data) => {
  try {
    const newData = {
      ...data,
      slug: slugify(data.slug),
    };

    const created = await communityWebsiteModel.createNew(newData);

    return await communityWebsiteModel.findOneById(created.insertedId);
  } catch (error) {
    return error;
  }
};

export const communityWebsiteService = {
  getAllItems,
  findBySlug,
  createNew,
};
