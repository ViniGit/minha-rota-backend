import { Request, Response } from "express"
import { container } from "tsyringe"
import { InactivateTravelUseCase } from "./inactivateTravelUseCase"

class InactivateTravelController {

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            let id = String(request.query.id)
            const inactivateTravelUseCase = container.resolve(InactivateTravelUseCase)
            await inactivateTravelUseCase.execute(id)

            return response.status(200).send()
        } catch (error) {
            console.log(error)
            return response.status(400).json(error)
        }
    }
}

export { InactivateTravelController }