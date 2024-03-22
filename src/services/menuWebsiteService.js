import { menuWebsiteModel } from "~/models/menuWebsiteModel";
import { slugify } from "~/utils/formatters";

const getAllItems = async () => {
  try {
    return await menuWebsiteModel.getAllItems();
  } catch (error) {
    return error;
  }
};

const findBySlug = async (slug) => {
  try {
    return await menuWebsiteModel.findBySlug(slug);
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

    const created = await menuWebsiteModel.createNew(newData);

    return await menuWebsiteModel.findOneById(created.insertedId);
  } catch (error) {
    return error;
  }
};

export const menuWebsiteService = {
  getAllItems,
  findBySlug,
  createNew,
};
