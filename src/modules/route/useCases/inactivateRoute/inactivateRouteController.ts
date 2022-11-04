import { Request, Response } from "express"
import { container } from "tsyringe"
import { InactivateRouteUseCase } from "./inactivateRouteUseCase"

class InactivateRouteController {

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            let id = String(request.query.id)
            const inactivateRouteUseCase = container.resolve(InactivateRouteUseCase)
            await inactivateRouteUseCase.execute(id)

            return response.status(201).send()
        } catch (error) {
            console.log(error)
            return response.status(400).json(error)
        }
    }
}

export { InactivateRouteController }