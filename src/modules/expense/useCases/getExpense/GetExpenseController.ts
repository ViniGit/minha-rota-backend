import { Request, Response } from "express"
import { container } from "tsyringe"
import { GetExpenseUseCase } from "./GetExpenseUseCase"

class GetExpenseController {

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            let user_id = request.user.id
            let { take, skip } = request.query
            const getExpenseUseCase = container.resolve(GetExpenseUseCase)

            let expenses = await getExpenseUseCase.execute({ user_id, take: Number(take), skip: Number(skip) })

            return response.status(201).json(expenses)
        } catch (error) {
            console.log(error)
            return response.status(400).json(error)
        }
    }
}

export { GetExpenseController }