import { inject, injectable } from "tsyringe"
import { ICreateTravelDTO } from "../../repositories/dtos/ICreateTravelDTO"
import { ITravelRepository } from "../../repositories/ITravelRepository"

@injectable()
class UpdateTravelUseCase {
    constructor(
        @inject("TravelRepository")
        private travelRepository: ITravelRepository) { }

    async execute({ date, description, route_id, travels, user_id, vehicle_id }: ICreateTravelDTO): Promise<void> {
        await this.travelRepository.update({ date, description, route_id, travels, user_id, vehicle_id })
    }

}

export { UpdateTravelUseCase }