import { MeController } from "../../controllers/auth/meController";
import { SignInController } from "../../controllers/auth/SignInController";
import { SignUpController } from "../../controllers/auth/SignUpController";
import { AuthenticationMiddleware } from "../../middlewares/AuthenticationMiddleware";
import { UserRepository } from "../../repositories/postgres/UserRepository";
import { SignInUseCase } from "../../useCases/auth/SignInUseCase";
import { SignUpUseCase } from "../../useCases/auth/SignUpUseCase";

export function makeSignInController() {
  const userRepository = new UserRepository();
  const signInUseCase = new SignInUseCase(userRepository);
  const signInController = new SignInController(signInUseCase);
  return signInController;
}

export function makeSignUpController() {
  const userRepository = new UserRepository();
  const signUpUseCase = new SignUpUseCase(userRepository);
  const signUpController = new SignUpController(signUpUseCase);
  return signUpController;
}

export function makeMeController() {
  return new MeController(new UserRepository());
}

export function makeAuthenticationMiddleware() {
  return new AuthenticationMiddleware();
}
