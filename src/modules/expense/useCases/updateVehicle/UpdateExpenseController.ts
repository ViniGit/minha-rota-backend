import { Request, Response } from "express"
import { container } from "tsyringe"
import { AppError } from "../../../../errors/AppError"
import { UpdateExpenseUseCase } from "./UpdateExpenseUseCase"

class UpdateExpenseController {

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { description, type, value, route } = request.body
            const id = String(request.params.id)

            if (!id)
                throw new AppError("User id not found")

            const updateExpenseUseCase = container.resolve(UpdateExpenseUseCase)

            await updateExpenseUseCase.execute({ description, type, value, route, user: id })

            return response.status(201).send()
        } catch (error) {
            console.log(error)
            return response.status(400).json(error)
        }
    }
}

export { UpdateExpenseController }