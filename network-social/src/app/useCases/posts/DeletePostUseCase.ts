import { PostNotFound } from "../../errors/PostNotFound";
import { PostgresDeletePostRepository } from "../../repositories/postgres/posts/deletePostRepository";
import { PostgresGetPostByIdRepository } from "../../repositories/postgres/posts/getPostByIdRepository";

export class DeletePostUseCase {
  constructor(
    private readonly postgresDeletePostRepository: PostgresDeletePostRepository,
    private readonly postgresGetPostByIdRepository: PostgresGetPostByIdRepository
  ) {}
  async execute(postId: number, accountId: number | undefined) {
    const post = await this.postgresGetPostByIdRepository.execute(postId);

    if (!post) {
      throw new PostNotFound();
    }

    if (post.authorId !== accountId) {
      throw new PostNotFound();
    }

    const deletedPost = await this.postgresDeletePostRepository.execute(postId);
    return deletedPost;
  }
}
