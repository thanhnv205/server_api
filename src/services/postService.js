import { slugify } from "~/utils/formatters";
import { postModel } from "~/models/postModel";
import ApiError from "~/utils/ApiError";
import { StatusCodes } from "http-status-codes";

const getAllPosts = async () => {
  try {
    return await postModel.getAllPosts();
  } catch (error) {
    return error;
  }
};

const getBySlug = async (slug) => {
  try {
    return await postModel.getBySlug(slug);
  } catch (error) {
    return error;
  }
};

const createNew = async (data) => {
  try {
    const newpost = {
      ...data,
      slug: slugify(data.title),
    };

    // gọi tới tầng model => lưu newpost vào Database
    const createdpost = await postModel.createNew(newpost);

    // lấy bản ghi post khi được tạo
    return await postModel.findOneById(createdpost.insertedId);
  } catch (error) {
    return error;
  }
};

const getDetails = async (data) => {
  try {
    const post = await postModel.getDetails(data);

    if (!post) throw new ApiError(StatusCodes.NOT_FOUND, "post not found!");

    return post;
  } catch (error) {
    return error;
  }
};

const update = async (id, body) => {
  try {
    const updateData = {
      ...body,
      updatedAt: Date.now(),
    };
    return await postModel.update(id, updateData);
  } catch (error) {
    return error;
  }
};

const active = async (id, data) => {
  try {
    const updateDate = {
      active: data.active,
      updatedAt: Date.now(),
    };
    await postModel.active(id, updateDate);
    return { message: "Active posts successfully!" };
  } catch (error) {
    return error;
  }
};

const deleteItem = async (id) => {
  try {
    // xóa item
    await postModel.deleteOneById(id);
    return { message: "Delete posts successfully!" };
  } catch (error) {
    return error;
  }
};

export const postService = {
  getAllPosts,
  getBySlug,
  createNew,
  getDetails,
  update,
  active,
  deleteItem,
};
