import { inject, injectable } from "tsyringe"
import { ITravelRepository } from "../../repositories/ITravelRepository"
import { Travel } from "../../entities/Travel"


@injectable()
class InactivateTravelUseCase {
    constructor(
        @inject("TravelRepository")
        private travelRepository: ITravelRepository) { }

    async execute(id: string): Promise<void> {
        await this.travelRepository.inactivate(id)
    }

}

export { InactivateTravelUseCase }