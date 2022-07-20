import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"
import { UsersRepositoryInMemory } from "../../repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../createUser/CreateUserUseCase";
import { ICreateUserDTO } from "../../dtos/IUserCreateDTO";

let authenticateUserUserCase: AuthenticateUserUseCase;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserUseCase: CreateUserUseCase;


describe("Authenticate User", () => {

  beforeEach(() => {
    usersRepositoryInMemory = new UsersRepositoryInMemory();
    authenticateUserUserCase = new AuthenticateUserUseCase(usersRepositoryInMemory);
    createUserUseCase = new CreateUserUseCase(usersRepositoryInMemory)
  })

  it("Should be able to authenticate an user", async () => {
    const user: ICreateUserDTO = {
      driver_license: "12345454",
      email: "user@test.com",
      name: "test",
      password: "password",
    }

    await createUserUseCase.execute(user);
    const result = await authenticateUserUserCase
      .execute({ email: user.email, password: user.password });
    
  })


})