import { inject, injectable } from "tsyringe"
import { hash } from 'bcrypt'
import { AppError } from "../../../../errors/AppError"
import { IVehicleRepository } from "../../repositories/IVehicleRepository"
import { Vehicle } from "../../entities/Vehicle"
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