import { Request, Response } from "express"
import { container } from "tsyringe"
import { AppError } from "../../../../errors/AppError"

import { GetUserByIdUseCase } from "./GetUserByIdUseCase"

class GetUserByIdController {

    async handle(request: Request, response: Response): Promise<Response> {

        const user_id = request.user.id

        if (!user_id)
            throw new AppError('User not found!')

        const createUserUseCase = container.resolve(GetUserByIdUseCase)

        const user = await createUserUseCase.execute(user_id)

        return response.status(200).json(user)

    }
}

export { GetUserByIdController }