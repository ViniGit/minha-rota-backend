import { Request, Response } from "express"
import { container } from "tsyringe"
import { CreateExpenseUseCase } from "./CreateExpenseUseCase"


class CreateExpenseController {

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { description, type, value, route } = request.body

            const createExpenseUseCase = container.resolve(CreateExpenseUseCase)

            let expense = await createExpenseUseCase.execute({ description, type, value, route, user: request.user.id })

            return response.status(201).json(expense)
        } catch (error) {
            console.log(error)
            return response.status(400).json(error)
        }
    }
}

export { CreateExpenseController }