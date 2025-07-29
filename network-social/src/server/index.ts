import express from "express";
import { routeAdapter } from "./adapters/routeAdapter";
import {
  makeAuthenticationMiddleware,
  makeMeController,
  makeSignInController,
  makeSignUpController,
} from "../app/factories/controllers/auth";
import { makeCreatePostController } from "../app/factories/controllers/post";
import { middlewareAdapter } from "./adapters/middlewareAdapter";

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

app.listen(3001, () => {
  console.log("server started at http://localhost:3001");
});
