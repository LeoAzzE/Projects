import express from "express";
import { routeAdapter } from "./adapters/routeAdapter";

import { middlewareAdapter } from "./adapters/middlewareAdapter";
import {
  makeAuthenticationMiddleware,
  makeMeController,
  makeSignUpController,
  makeSignInController,
  makeAuthorizationMiddleware,
} from "../app/factories/controllers/auth";
import {
  makeCreatePostController,
  makeDeletePostController,
  makeListPostsController,
  makeUpdatePostController,
} from "../app/factories/controllers/post";

const app = express();

app.use(express.json());

app.get(
  "/me",
  middlewareAdapter(makeAuthenticationMiddleware()),
  routeAdapter(makeMeController())
);

app.post("/sign-up", routeAdapter(makeSignUpController()));
app.post("/sign-in", routeAdapter(makeSignInController()));

app.post(
  "/post",
  middlewareAdapter(makeAuthenticationMiddleware()),
  routeAdapter(makeCreatePostController())
);

app.delete(
  "/post/:postId",
  middlewareAdapter(makeAuthenticationMiddleware()),
  routeAdapter(makeDeletePostController())
);

app.put(
  "/post/:postId",
  middlewareAdapter(makeAuthenticationMiddleware()),
  routeAdapter(makeUpdatePostController())
);

//ADMIN
app.get(
  "/listPosts",
  middlewareAdapter(makeAuthenticationMiddleware()),
  middlewareAdapter(makeAuthorizationMiddleware(["ADMIN"])),
  routeAdapter(makeListPostsController())
);

app.listen(3001, () => {
  console.log("server started at http://localhost:3001");
});
