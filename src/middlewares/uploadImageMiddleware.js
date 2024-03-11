import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { generateFileName } from "~/utils/helper";
import { StatusCodes } from "http-status-codes";
import { createTempFolder, moveFileToUploads } from "~/utils/tempFolder";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const urlParts = req.originalUrl.split("/");
    createTempFolder(`/images/${urlParts[2]}`);

    const uploadPath = path.join(__dirname, `../../tmp/images/${urlParts[2]}`);
    cb(null, uploadPath);
  },

  filename: function (req, file, cb) {
    const { file_name } = generateFileName(file.originalname);
    cb(null, file_name);
  },
});

export const uploadImageMiddleware = multer({ storage });

export const serveImages = (req, res) => {
  const { type, file } = req.params;
  const pathTmp = path.resolve(__dirname, `../../tmp/images/${type}/${file}`);
  const pathUploads = path.resolve(
    __dirname,
    `../../uploads/images/${type}/${file}`
  );

  const filePath = fs.existsSync(pathTmp) ? pathTmp : pathUploads;

  res.sendFile(filePath);
};

export const deleteImage = async (req, res) => {
  try {
    const { file } = req.body;
    const urlParts = req.originalUrl.split("/");
    const imagePath = path.resolve(
      __dirname,
      `../../tmp/images/${urlParts[2]}/${file}`
    );

    fs.unlinkSync(imagePath);
    res.status(StatusCodes.OK).json({ message: "Xóa hình ảnh thành công!" });
  } catch (error) {
    res.status(StatusCodes.UNPROCESSABLE_ENTITY).json({
      errors: "Không tìm thấy hình ảnh.",
    });
  }
};

export const saveImages = (req, res, next) => {
  try {
    const { image_name } = req.body;
    if (image_name) {
      const urlParts = req.originalUrl.split("/");
      const dirTmp = path.resolve(
        __dirname,
        `../../tmp/images/${urlParts[2]}/${image_name}`
      );
      if (fs.existsSync(dirTmp)) {
        moveFileToUploads(`/images/${urlParts[2]}`, dirTmp, image_name);
      }
    }
  } catch (error) {
    next(error);
  }
};

export const destroyImages = (req, res, next) => {
  try {
    const { image_name } = req.body;
    console.log(image_name);
  } catch (error) {
    next(error);
  }
};
