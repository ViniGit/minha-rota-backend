import { Request, Response } from "express"
import { container } from "tsyringe"
import { InactivateExpenseUseCase } from "./inactivateExpenseUseCase"

class InactivateExpenseController {

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            let id = String(request.query.id)
            const inactivateExpenseUseCase = container.resolve(InactivateExpenseUseCase)
            await inactivateExpenseUseCase.execute(id)

            return response.status(200).send()
        } catch (error) {
            console.log(error)
            return response.status(400).json(error)
        }
    }
}

export { InactivateExpenseController }