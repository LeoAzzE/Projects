import { Request, Response } from "express";
import { Controller } from "../../app/contracts/Controller";
import { ZodError } from "zod";

export function routeAdapter(controller: Controller) {
  return async (request: Request, response: Response) => {
    try {
      const { statusCode, body } = await controller.execute({
        body: request.body,
        params: request.params,
        account: request.metadata?.account,
        headers: request.headers as Record<string, string>,
      });
      response.status(statusCode).json(body);
    } catch (error) {
      if (error instanceof ZodError) {
        return response.status(400).json({
          error: "Validation failed",
          details: error.issues,
        });
      }

      if (error instanceof Error) {
        return response.status(500).json({
          error: error.message,
        });
      }
      return response.status(500).json({
        error: "Internal server error",
      });
    }
  };
}
