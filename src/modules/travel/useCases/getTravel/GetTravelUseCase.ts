import { inject, injectable } from "tsyringe"
import { ITravelRepository } from "../../repositories/ITravelRepository"
import { Travel } from "../../entities/Travel"
interface IResponse {
    travel: Travel[],
    count: number
}

interface IRequest {
    user_id: string,
    take: number,
    skip: number
}

@injectable()
class GetTravelUseCase {
    constructor(
        @inject("TravelRepository")
        private routeRepository: ITravelRepository) { }

    async execute({ user_id, take, skip }: IRequest): Promise<IResponse> {
        return await this.routeRepository.getAll(user_id, take, skip)
    }

}

export { GetTravelUseCase }