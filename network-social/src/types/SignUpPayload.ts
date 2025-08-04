import { Role } from "../generated/prisma";

export interface ISignUpPayload {
  name: string;
  email: string;
  password: string;
  role: Role;
}

export type ISignUpInput = Omit<ISignUpPayload, "role">;
