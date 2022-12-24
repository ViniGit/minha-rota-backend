import { Request, Response } from "express"
import { container } from "tsyringe"
import { GetExpenseReportUseCase } from "./GetExpenseReportUseCase"

class GetExpenseReportController {

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            let user_id = request.user.id
            let { startDate, finalDate, type } = request.params
            const getExpenseUseCase = container.resolve(GetExpenseReportUseCase)

            let expenses = await getExpenseUseCase.execute({ user_id, type, startDate: new Date(startDate), finalDate: new Date(finalDate) })

            return response.status(201).json(expenses)
        } catch (error) {
            console.log(error)
            return response.status(400).json(error)
        }
    }
}

export { GetExpenseReportController }