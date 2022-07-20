import { inject, injectable } from "tsyringe";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { sign } from "jsonwebtoken"

import { compare } from "bcryptjs";
import { AppError } from "@shared/errors/AppError";

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: {
    name: string,
    email: string,
  },
  token: string;
}

@injectable()
class AuthenticateUserUseCase {
  constructor(
    @inject("UsersRepository")
    private userRepository: IUsersRepository
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.userRepository.findByEmail(email);

    if(!user){
      throw new AppError("Email or password incorrect!");
    }

    const passwordMatch = await compare(password, user.password);

    if(!passwordMatch){
      throw new AppError("Email or password incorrect!");
    }

    const token = sign({}, "ae90f7ef9a6a0a1d3e351eb5ec647668", {
      subject: user.id,
      expiresIn: "1d"
    });

    const tokenReturn: IResponse = {
      token,
      user: {
        name: user.name,
        email: user.email
      }
    }
    return tokenReturn;

  }
}

export { AuthenticateUserUseCase }