import { Request, Response } from "express"
import { container } from "tsyringe"
import { AppError } from "../../../../errors/AppError"

import { UpdateUserUseCase } from "./UpdateUserUseCase"

class UpdateUserController {

    async handle(request: Request, response: Response): Promise<Response> {

        try {
            const { name, email, cpf, cell, birth_date, newPassword, changePassword, currentPassword } = request.body
            const { id } = request.params

            const updateUserUseCase = container.resolve(UpdateUserUseCase)

            let user = await updateUserUseCase.execute({ name, email, cpf, cell, birth_date, id })

            if (changePassword) {
                if (currentPassword == newPassword)
                    throw new AppError("A nova senha deve ser diferente da atual!")

                let correctPassword = await updateUserUseCase.verifyOldPassword(currentPassword, email)
                if (correctPassword) {
                    await updateUserUseCase.updatePassword(id, newPassword)
                    user['logout'] = true
                }

            }
            return response.status(201).json(user)
        } catch (error) {
            console.error(error)
            return response.status(400).json(error)
        }
    }


}

export { UpdateUserController }