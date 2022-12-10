import { inject, injectable } from "tsyringe"
import { hash } from 'bcrypt'
import { AppError } from "../../../../errors/AppError"
import { IVehicleRepository } from "../../repositories/ITravelRepository"
import { Vehicle } from "../../entities/Travel"
interface IResponse {
    vehicles: Vehicle[],
    count: number
}


@injectable()
class InactivateVehicleUseCase {
    constructor(
        @inject("VehicleRepository")
        private routeRepository: IVehicleRepository) { }

    async execute(id: string): Promise<void> {
        await this.routeRepository.inactivate(id)
    }

}

export { InactivateVehicleUseCase }