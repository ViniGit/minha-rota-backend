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

interface IRequest {
    user_id: string,
    take: number,
    skip: number
}

@injectable()
class GetRouteUseCase {
    constructor(
        @inject("RouteRepository")
        private routeRepository: IRouteRepository) { }

    async execute({ user_id, take, skip }: IRequest): Promise<IResponse> {
        return await this.routeRepository.getAll(user_id, take, skip)
    }

}

export { GetRouteUseCase }