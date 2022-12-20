import { Request, Response } from "express"
import { container } from "tsyringe"
import { GetTravelUseCase } from "./GetTravelUseCase"

class GetTravelController {

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            let user_id = request.user.id
            let { take, skip } = request.query
            const getRouteUseCase = container.resolve(GetTravelUseCase)

            let travel = await getRouteUseCase.execute({ user_id, take: Number(take), skip: Number(skip) })

            return response.status(201).json(travel)
        } catch (error) {
            console.log(error)
            return response.status(400).json(error)
        }
    }
}

export { GetTravelController }