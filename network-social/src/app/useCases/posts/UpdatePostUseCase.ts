import { IAccount } from "../../../types/Role";
import { PostNotFound } from "../../errors/PostNotFound";
import { PostgresGetPostByIdRepository } from "../../repositories/postgres/posts/getPostByIdRepository";
import { PostgresUpdatePostRepository } from "../../repositories/postgres/posts/updatePostRepository";

interface IUpdatePost {
  postId: number;
  content?: string;
  imageUrl?: string;
}

export class UpdatePostUseCase {
  constructor(
    private readonly getPostByIdRepository: PostgresGetPostByIdRepository,
    private readonly updatePostRepository: PostgresUpdatePostRepository
  ) {}

  async execute({ postId, content, imageUrl }: IUpdatePost, account: IAccount) {
    const post = await this.getPostByIdRepository.execute(postId);

    if (!post) {
      throw new PostNotFound();
    }

    // Only author or ADMIN can update
    if (post.authorId !== account.id && account.role !== "ADMIN") {
      throw new PostNotFound();
    }

    const updateData: { content?: string; imageUrl?: string } = {};
    if (typeof content === "string") {
      const trimmed = content.trim();
      if (trimmed.length === 0) {
        throw new Error("O conteúdo do post não pode ser vazio.");
      }
      if (trimmed.length > 1000) {
        throw new Error(
          "O conteúdo do post deve ter no máximo 1000 caracteres."
        );
      }
      updateData.content = trimmed;
    }
    if (typeof imageUrl === "string") {
      updateData.imageUrl = imageUrl;
    }

    const updated = await this.updatePostRepository.execute(postId, updateData);
    if (!updated) {
      throw new PostNotFound();
    }
    return updated;
  }
}
