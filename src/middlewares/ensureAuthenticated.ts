import { NextFunction, Request, Response } from "express"
import { verify } from "jsonwebtoken"
import { AppError } from "../errors/AppError"
import { UsersTokenRepository } from "../modules/accounts/repositories/implementations/UsersTokenRepository"

interface IPayload {
    sub: string
}

export async function esureAuthenticated(request: Request, response: Response, next: NextFunction) {

    const authHeader = request.headers.authorization

    if (!authHeader) {
        throw new AppError("Token missing", 401)
    }

    const [, token] = authHeader.split(" ")

    try {
        const { sub: user_id } = verify(token, process.env.TOKEN_SECRET_KEY) as IPayload

        request.user = {
            id: user_id
        }
        next()

    } catch (error) {
        throw new AppError("Invalid token!", 401)
    }

}