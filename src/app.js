/* eslint-disable no-console */
import express from "express";
import cors from "cors";
import { corsOptions } from "~/config/cross";

import exitHook from "async-exit-hook";
import { connectDB, closeDB } from "~/config/mongodb";

import { env } from "~/config/environment";
import { errorHandlingMiddleware } from "~/middlewares/errorHandlingMiddleware";
import { serveImages } from "./middlewares/uploadImageMiddleware";

import { APIs_auth } from "./routes/auth";
import { APIs_system } from "./routes/system";
import { APIs_V1 } from "~/routes/v1";
import { APIs_website } from "./routes/website";

const startServer = () => {
  const app = express();
  app.use(cors(corsOptions));
  app.use(express.json());

  app.use("/auth", APIs_auth);
  app.use("/system", APIs_system);
  app.use("/v1", APIs_V1);
  app.use("/images/:type/:file", serveImages);

  // apis website services
  app.use("/website", APIs_website);

  app.use(errorHandlingMiddleware);

  app.listen(env.PORT, env.APP_HOST, () => {
    console.log(`Server running at http://${env.APP_HOST}:${env.PORT}`);
  });

  //  cleanup trước khi dừng server
  exitHook(() => {
    closeDB();
    console.log("exiting");
  });
};

(async () => {
  try {
    await connectDB();
    startServer();
    console.log("Connected to MongoDB Cloud Atlas!");
  } catch (error) {
    process.exit(0);
  }
})();
