import { Request, Response } from "express"
import { container } from "tsyringe"
import { InactivateVehicleUseCase } from "./inactivateVehicleUseCase"

class InactivateVehicleController {

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            let id = String(request.query.id)
            const inactivateVehicleUseCase = container.resolve(InactivateVehicleUseCase)
            await inactivateVehicleUseCase.execute(id)

            return response.status(200).send()
        } catch (error) {
            console.log(error)
            return response.status(400).json(error)
        }
    }
}

export { InactivateVehicleController }