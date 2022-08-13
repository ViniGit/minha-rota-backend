import { Request, Response } from "express"
import { container } from "tsyringe"
import { AppError } from "../../../../errors/AppError"

import { GetUserByTokenUseCase } from "./GetUserByTokenUseCase"

class GetUserByTokenController {

    async handle(request: Request, response: Response): Promise<Response> {

        const user_id = request.user.id

        if (!user_id)
            throw new AppError('User not found!')

        const createUserUseCase = container.resolve(GetUserByTokenUseCase)

        const user = await createUserUseCase.execute(user_id)

        return response.status(200).json(user)

    }
}

export { GetUserByTokenController }