import { Request, Response } from "express"
import { container } from "tsyringe"

import { UpdateUserUseCase } from "./UpdateUserUseCase"

class UpdateUserController {

    async handle(request: Request, response: Response): Promise<Response> {

        const { name, email, cpf, cell, birth_date, password, changePassword } = request.body
        const { id } = request.params

        const updateUserUseCase = container.resolve(UpdateUserUseCase)

        await updateUserUseCase.execute({ name, email, cpf, cell, birth_date, id })

        // if(changePassword)
        /** @todo fazer a lógica de alteração de senha */

        return response.status(201).send()

    }
}

export { UpdateUserController }