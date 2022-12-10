import { inject, injectable } from "tsyringe"
import { hash } from 'bcrypt'
import { AppError } from "../../../../errors/AppError"
import { ICreateTravelDTO } from "../../repositories/dtos/ICreateTravelDTO"
import { ITravelRepository } from "../../repositories/ITravelRepository"
import { Travel } from "../../entities/Travel"

@injectable()
class CreateTravelUseCase {
    constructor(
        @inject("TravelRepository")
        private routeRepository: ITravelRepository) { }

    async execute({ date, description, route_id, travels, user_id, vehicle_id }: ICreateTravelDTO): Promise<Travel> {

        let travel = await this.routeRepository.create({
            date,
            description,
            route_id,
            travels,
            user_id,
            vehicle_id
        })

        return travel
    }

}

export { CreateTravelUseCase }