import { Request, Response } from "express"
import { container } from "tsyringe"
import { CreateTravelUseCase } from "./CreateTravelUseCase"

// import { CreateUserUseCase } from "./CreateRouteUseCase"

class CreateTravelController {

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { description,
                travels,
                route,
                vehicle,
                date } = request.body

            const createRouteUseCase = container.resolve(CreateTravelUseCase)

            let travel = await createRouteUseCase.execute({ date, description, route_id: route, travels, user_id: request.user.id, vehicle_id: vehicle })

            return response.status(201).json(travel)
        } catch (error) {
            console.log(error)
            return response.status(400).json(error)
        }
    }
}

export { CreateTravelController }