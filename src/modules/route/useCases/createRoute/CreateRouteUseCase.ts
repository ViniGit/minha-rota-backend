import { inject, injectable } from "tsyringe"
import { hash } from 'bcrypt'
import { AppError } from "../../../../errors/AppError"
import { ICreateRouteDTO } from "../../repositories/dtos/ICreateRouteDTO"
import { IRouteRepository } from "../../repositories/IRouteRepository"
import { Route } from "../../entities/Route"

@injectable()
class CreateRouteUseCase {
    constructor(
        @inject("RouteRepository")
        private routeRepository: IRouteRepository) { }

    async execute({ destination, distance, price, user, description }: ICreateRouteDTO): Promise<Route> {

        let route = await this.routeRepository.create({
            destination, 
            description,
            distance, 
            price, 
            user
        })

        return route
    }

}

export { CreateRouteUseCase }