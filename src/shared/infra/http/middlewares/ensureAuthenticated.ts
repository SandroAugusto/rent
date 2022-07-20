import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "@shared/errors/AppError";
import { UsersRepository } from "@modules/accounts/infra/typeorm/repositories/UsersRepository";


export async function ensureAuthenticated(request: Request, response: Response, next: NextFunction){

  const authHeader = request.headers.authorization;

  if(!authHeader) {
    throw new AppError("Token is missing", 401)
  }

  const [, token] = authHeader.split(" ");

  try {
    const { sub: user_id } = verify(token, "ae90f7ef9a6a0a1d3e351eb5ec647668");
    

    const usersRepository = new UsersRepository();

    const user = await usersRepository.findById(user_id as string);

    if (!user) {
      throw new AppError("User does not exists!", 401)
    }

    request.user = {
      id: user_id as string
    }
    next();
  } catch (error) {
    throw new AppError("Invalid token!", 401);
  }
}