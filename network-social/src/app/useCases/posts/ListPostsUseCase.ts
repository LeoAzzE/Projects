import { PostgresListPostsRepository } from "../../repositories/postgres/posts/listPostsRepository";

export class ListPostsUseCase {
  constructor(
    private readonly postgresListPostsRepository: PostgresListPostsRepository
  ) {}

  async execute() {
    const posts = await this.postgresListPostsRepository.execute();
    return posts;
  }
}
