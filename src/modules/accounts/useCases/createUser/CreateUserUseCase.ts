import { inject, injectable } from "tsyringe";
import { hash } from "bcryptjs"
import { ICreateUserDTO } from "../../dtos/IUserCreateDTO";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { AppError } from "@shared/errors/AppError";


@injectable()
class CreateUserUseCase {

  constructor(

    @inject("UsersRepository")
    private usersrepository: IUsersRepository
  ) {}

  async execute({ 
    name, 
    password, 
    email, 
    driver_license,
  }: ICreateUserDTO): Promise<void> {

    const userAlreadyExists = await this.usersrepository.findByEmail(email);

    if(userAlreadyExists) {
      throw new AppError("User already exists");
    }

    const passwordHash = await hash(password, 8);

    await this.usersrepository.create({
      name, 
      password: passwordHash,
      email, 
      driver_license
    })
  }
}

export { CreateUserUseCase }