import { inject, injectable } from "tsyringe"
import { ICreateVehicleDTO } from "../../repositories/dtos/ICreateVehicleDTO"
import { IVehicleRepository } from "../../repositories/IVehicleRepository"
import { Vehicle } from "../../entities/Vehicle"
import { AppError } from "../../../../errors/AppError"

@injectable()
class CreateVehicleUseCase {
    constructor(
        @inject("VehicleRepository")
        private vehicleRepository: IVehicleRepository) { }

    async execute({ plate, type, km_per_lt, user }: ICreateVehicleDTO): Promise<Vehicle> {

        const vehicleExists = await this.vehicleRepository.findByPlate(plate)

        if (vehicleExists)
            throw new AppError('Vehicle already exists')

        let vehicle = await this.vehicleRepository.create({
            plate,
            type,
            km_per_lt,
            user
        })

        return vehicle
    }

}

export { CreateVehicleUseCase }