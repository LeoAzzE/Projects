import express from "express";
import { routeAdapter } from "./adapters/routeAdapter";
import {
  makeSignInController,
  makeSignUpController,
} from "../app/factories/controllers/auth";
import { makeCreatePostController } from "../app/factories/controllers/post";

const app = express();

app.use(express.json());

app.post("/sign-up", routeAdapter(makeSignUpController()));
app.post("/sign-in", routeAdapter(makeSignInController()));
app.post("/post", routeAdapter(makeCreatePostController()));

app.listen(3001, () => {
  console.log("server started at http://localhost:3001");
});
