import { Request, Response } from "express"
import { container } from "tsyringe"
import { CreateRouteUseCase } from "./CreateRouteUseCase"

// import { CreateUserUseCase } from "./CreateRouteUseCase"

class CreateRouteController {

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            const { destination, distance, price } = request.body

            const createRouteUseCase = container.resolve(CreateRouteUseCase)

            let route = await createRouteUseCase.execute({ destination, distance, price, user: request.user.id })

            return response.status(201).json(route)
        } catch (error) {
            console.log(error)
            return response.status(400).json(error)
        }
    }
}

export { CreateRouteController }