import { CreatePostController } from "../../controllers/post/CreatePostController";
import { DeletePostController } from "../../controllers/post/DeletePostController";
import { ListPostsController } from "../../controllers/post/ListPostsController";
import { UpdatePostController } from "../../controllers/post/UpdatePostController";
import { PostgresCreatePostRepository } from "../../repositories/postgres/posts/createPostRepository";
import { PostgresDeletePostRepository } from "../../repositories/postgres/posts/deletePostRepository";
import { PostgresGetPostByIdRepository } from "../../repositories/postgres/posts/getPostByIdRepository";
import { PostgresListPostsRepository } from "../../repositories/postgres/posts/listPostsRepository";
import { PostgresUpdatePostRepository } from "../../repositories/postgres/posts/updatePostRepository";
import { UserRepository } from "../../repositories/postgres/UserRepository";
import { CreatePostUseCase } from "../../useCases/posts/CreatePostUseCase";
import { DeletePostUseCase } from "../../useCases/posts/DeletePostUseCase";
import { ListPostsUseCase } from "../../useCases/posts/ListPostsUseCase";
import { UpdatePostUseCase } from "../../useCases/posts/UpdatePostUseCase";

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

export function makeListPostsController() {
  const listPostsRepository = new PostgresListPostsRepository();
  const listPostsUseCase = new ListPostsUseCase(listPostsRepository);
  const listPostsController = new ListPostsController(listPostsUseCase);
  return listPostsController;
}

export function makeUpdatePostController() {
  const getPostByIdRepository = new PostgresGetPostByIdRepository();
  const updatePostRepository = new PostgresUpdatePostRepository();
  const updatePostUseCase = new UpdatePostUseCase(
    getPostByIdRepository,
    updatePostRepository
  );
  const updatePostController = new UpdatePostController(updatePostUseCase);
  return updatePostController;
}
