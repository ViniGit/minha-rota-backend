import { Request, Response } from "express"
import { container } from "tsyringe"
import { GetRouteUseCase } from "./GetRouteUseCase"

// import { CreateUserUseCase } from "./CreateRouteUseCase"

class GetRouteController {

    async handle(request: Request, response: Response): Promise<Response> {
        try {
            let user_id = request.user.id
            let { take, skip } = request.query
            const getRouteUseCase = container.resolve(GetRouteUseCase)

            let routes = await getRouteUseCase.execute({user_id, take: Number(take), skip: Number(skip)})

            return response.status(201).json(routes)
        } catch (error) {
            console.log(error)
            return response.status(400).json(error)
        }
    }
}

export { GetRouteController }