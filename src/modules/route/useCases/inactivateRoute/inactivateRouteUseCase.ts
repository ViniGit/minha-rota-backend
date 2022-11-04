import { inject, injectable } from "tsyringe"
import { hash } from 'bcrypt'
import { AppError } from "../../../../errors/AppError"
import { ICreateRouteDTO } from "../../repositories/dtos/ICreateRouteDTO"
import { IRouteRepository } from "../../repositories/IRouteRepository"
import { Route } from "../../entities/Route"
interface IResponse {
    routes: Route[],
    count: number
}


@injectable()
class InactivateRouteUseCase {
    constructor(
        @inject("RouteRepository")
        private routeRepository: IRouteRepository) { }

    async execute(id: string): Promise<void> {
        await this.routeRepository.inactivate(id)
    }

}

export { InactivateRouteUseCase }