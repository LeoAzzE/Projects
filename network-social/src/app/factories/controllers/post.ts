import { CreatePostController } from "../../controllers/post/CreatePostController";
import { DeletePostController } from "../../controllers/post/DeletePostController";
import { PostgresCreatePostRepository } from "../../repositories/postgres/posts/createPostRepository";
import { PostgresDeletePostRepository } from "../../repositories/postgres/posts/deletePostRepository";
import { PostgresGetPostByIdRepository } from "../../repositories/postgres/posts/getPostByIdRepository";
import { UserRepository } from "../../repositories/postgres/UserRepository";
import { CreatePostUseCase } from "../../useCases/posts/CreatePostUseCase";
import { DeletePostUseCase } from "../../useCases/posts/DeletePostUseCase";

export function makeCreatePostController() {
  const createPostRepository = new PostgresCreatePostRepository();
  const userRepository = new UserRepository();
  const createPostUseCase = new CreatePostUseCase(
    createPostRepository,
    userRepository
  );
  const createPostController = new CreatePostController(createPostUseCase);
  return createPostController;
}

export function makeDeletePostController() {
  const deletePostRepository = new PostgresDeletePostRepository();
  const postgresGetPostByIdRepository = new PostgresGetPostByIdRepository();
  const deletePostUseCase = new DeletePostUseCase(
    deletePostRepository,
    postgresGetPostByIdRepository
  );
  const deletePostController = new DeletePostController(deletePostUseCase);
  return deletePostController;
}
