import { Request, Response } from "express"
import { container } from "tsyringe"
import { AppError } from "../../../../errors/AppError"
import { UpdateVehicleUseCase } from "./UpdateVehicleUseCase"

class UpdateVehicleController {

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { plate, type, km_per_lt } = request.body
            const id = String(request.params.id)

            if (!id)
                throw new AppError("User id not found")

            const updateVehicleUseCase = container.resolve(UpdateVehicleUseCase)

            await updateVehicleUseCase.execute({ plate, type, km_per_lt, id: id })

            return response.status(201).send()
        } catch (error) {
            console.log(error)
            return response.status(400).json(error)
        }
    }
}

export { UpdateVehicleController }