import { Request, Response } from "express"
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"
import { container } from "tsyringe"

class AuthenticateUserController {
    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { password, email } = request.body

            const authenticateUserUseCase = container.resolve(AuthenticateUserUseCase)

            const token = await authenticateUserUseCase.execute({ password, email })

            return response.json(token)
        } catch (error) {
            response.status(400).send(error)
        }
    }

}

export { AuthenticateUserController }