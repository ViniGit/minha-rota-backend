import { inject, injectable } from "tsyringe"
import { hash } from 'bcrypt'
import { AppError } from "../../../../errors/AppError"
import { ICreateRouteDTO, IUpdateRouteDTO } from "../../repositories/dtos/ICreateRouteDTO"
import { IRouteRepository } from "../../repositories/IRouteRepository"
import { Route } from "../../entities/Route"

@injectable()
class UpdateRouteUseCase {
    constructor(
        @inject("RouteRepository")
        private routeRepository: IRouteRepository) { }

    async execute({ destination, distance, price, description, id }: IUpdateRouteDTO): Promise<void> {

        // let route = 
        await this.routeRepository.update({
            destination,
            description,
            distance,
            price,
            id
        })
    }

}

export { UpdateRouteUseCase }