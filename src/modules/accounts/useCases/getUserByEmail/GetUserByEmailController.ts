import { Request, Response } from "express"
import { container } from "tsyringe"

import { GetUserByEmailUseCase } from "./GetUserByEmailUseCase"

class GetUserByEmailController {

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { email } = request.params

            const getUserByEmail = container.resolve(GetUserByEmailUseCase)

            const user = await getUserByEmail.execute(email)

            return response.json(user)
        } catch (error) {
            console.log(error)
        }
    }
}

export { GetUserByEmailController }