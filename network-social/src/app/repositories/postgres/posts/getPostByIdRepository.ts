import { prismaClient } from "../../../lib/prismaClient";

export class PostgresGetPostByIdRepository {
  async execute(postId: number) {
    return await prismaClient.post.findUnique({
      where: {
        id: Number(postId),
      },
    });
  }
}
