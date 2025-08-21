import { prismaClient } from "../../../lib/prismaClient";

export class PostgresListPostsRepository {
  async execute() {
    return await prismaClient.post.findMany({
      orderBy: { createdAt: "desc" },
    });
  }
}
