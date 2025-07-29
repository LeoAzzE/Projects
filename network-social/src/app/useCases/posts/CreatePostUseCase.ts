import { PostgresCreatePostRepository } from "../../repositories/postgres/posts/createPostRepository";
import { UserRepository } from "../../repositories/postgres/UserRepository";

export class CreatePostUseCase {
  constructor(
    private readonly postgresCreatePostRepository: PostgresCreatePostRepository,
    private readonly userRepository: UserRepository
  ) {}

  async execute({ content, imageUrl, authorId }) {
    if (!content?.trim()) {
      throw new Error("O conteúdo do post não pode ser vazio.");
    }

    if (content.length > 1000) {
      throw new Error("O conteúdo do post deve ter no máximo 1000 caracteres.");
    }

    if (!authorId) {
      throw new Error("Autor não encontrado.");
    }

    const authorExists = await this.userRepository.findById(authorId);

    if (!authorExists) {
      throw new Error("Usuário não existe.");
    }

    return await this.postgresCreatePostRepository.execute({
      content,
      imageUrl,
      authorId,
    });
  }
}
