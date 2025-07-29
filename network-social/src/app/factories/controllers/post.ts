import { CreatePostController } from "../../controllers/post/CreatePostController";
import { PostgresCreatePostRepository } from "../../repositories/postgres/posts/createPostRepository";
import { UserRepository } from "../../repositories/postgres/UserRepository";
import { CreatePostUseCase } from "../../useCases/posts/CreatePostUseCase";

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
