import { Request, Response } from "express"
import { container } from "tsyringe"
import { CreateVehicleUseCase } from "./CreateVehicleUseCase"

// import { CreateUserUseCase } from "./CreateRouteUseCase"

class CreateVehicleController {

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { plate, type, km_per_lt } = request.body

            const createRouteUseCase = container.resolve(CreateVehicleUseCase)

            let route = await createRouteUseCase.execute({ plate, type, km_per_lt, user: request.user.id })

            return response.status(201).json(route)
        } catch (error) {
            console.log(error)
            return response.status(400).json(error)
        }
    }
}

export { CreateVehicleController }