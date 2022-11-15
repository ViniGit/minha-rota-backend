import { inject, injectable } from "tsyringe"
import { hash } from 'bcrypt'
import { AppError } from "../../../../errors/AppError"
import { ICreateVehicleDTO } from "../../repositories/dtos/ICreateVehicleDTO"
import { IVehicleRepository } from "../../repositories/IVehicleRepository"
import { Vehicle } from "../../entities/Vehicle"

@injectable()
class CreateVehicleUseCase {
    constructor(
        @inject("VehicleRepository")
        private routeRepository: IVehicleRepository) { }

    async execute({ plate, type, km_per_lt, user }: ICreateVehicleDTO): Promise<Vehicle> {

        let route = await this.routeRepository.create({
            plate,
            type,
            km_per_lt,
            user
        })

        return route
    }

}

export { CreateVehicleUseCase }