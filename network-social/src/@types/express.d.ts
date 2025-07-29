declare namespace Express {
  interface Request {
    metadata: {
      accountId: number | undefined;
    };
  }
}
