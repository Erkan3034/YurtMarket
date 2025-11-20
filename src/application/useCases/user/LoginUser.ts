import { IUserRepository } from "../../../domain/repositories/IUserRepository";
import { DomainError } from "../../../shared/errors/DomainError";

export interface AuthSession {
  accessToken: string;
  refreshToken?: string;
}

export interface AuthProvider {
  signIn(email: string, password: string): Promise<AuthSession>;
}

export interface LoginUserDTO {
  email: string;
  password: string;
}

export class LoginUser {
  constructor(private userRepo: IUserRepository, private authProvider: AuthProvider) {}

  async execute(dto: LoginUserDTO) {
    const user = await this.userRepo.findByEmail(dto.email);
    if (!user) {
      throw new DomainError("Invalid credentials");
    }

    const session = await this.authProvider.signIn(dto.email, dto.password);
    return { user, session };
  }
}

