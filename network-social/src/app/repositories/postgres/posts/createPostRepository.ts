import { prismaClient } from "../../../lib/prismaClient";

interface IPost {
  content: string;
  imageUrl?: string;
  authorId: number;
}

export class PostgresCreatePostRepository {
  async execute({ content, imageUrl, authorId }: IPost) {
    return await prismaClient.post.create({
      data: { content, imageUrl, authorId },
    });
  }
}
