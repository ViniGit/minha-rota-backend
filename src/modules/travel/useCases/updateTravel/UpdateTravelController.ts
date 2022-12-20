import { Request, Response } from "express"
import { container } from "tsyringe"
import { AppError } from "../../../../errors/AppError"
import { UpdateTravelUseCase } from "./UpdateTravelUseCase"

class UpdateTravelController {

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { date, description, route_id, travels, vehicle_id } = request.body
            const id = String(request.params.id)

            if (!id)
                throw new AppError("User id not found")

            const updateTravelUseCase = container.resolve(UpdateTravelUseCase)

            await updateTravelUseCase.execute({ date, description, route_id, travels, user_id: id, vehicle_id })

            return response.status(201).send()
        } catch (error) {
            console.log(error)
            return response.status(400).json(error)
        }
    }
}

export { UpdateTravelController }