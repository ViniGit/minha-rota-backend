import { Request, Response } from "express"
import { container } from "tsyringe"
import { AppError } from "../../../../errors/AppError"
import { UpdateRouteUseCase } from "./UpdateRouteUseCase"

// import { CreateUserUseCase } from "./CreateRouteUseCase"

class UpdateRouteController {

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { destination, distance, price, description } = request.body
            const id = String(request.params.id)

            if (!id)
                throw new AppError("User id not found")

            const updateRouteUseCase = container.resolve(UpdateRouteUseCase)

            // let route = 
            await updateRouteUseCase.execute({ destination, distance, price, description, id: id })

            return response.status(201).send()
        } catch (error) {
            console.log(error)
            return response.status(400).json(error)
        }
    }
}

export { UpdateRouteController }