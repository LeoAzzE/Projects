declare namespace Express {
  interface Request {
    metadata: {
      account?: {
        id: number | undefined;
        role: string;
      };
    };
  }
}
