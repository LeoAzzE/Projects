import { prismaClient } from "../../../lib/prismaClient";

interface IUpdatePostData {
  content?: string;
  imageUrl?: string;
}

export class PostgresUpdatePostRepository {
  async execute(postId: number, data: IUpdatePostData) {
    try {
      return await prismaClient.post.update({
        where: { id: Number(postId) },
        data,
      });
    } catch (error) {
      return null;
    }
  }
}
