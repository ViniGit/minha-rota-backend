import { inject, injectable } from "tsyringe"
import { hash } from 'bcrypt'
import { AppError } from "../../../../errors/AppError"
import { ICreateVehicleDTO, IUpdateVehicleDTO } from "../../repositories/dtos/ICreateVehicleDTO"
import { IVehicleRepository } from "../../repositories/IVehicleRepository"
import { Vehicle } from "../../entities/Vehicle"

@injectable()
class UpdateVehicleUseCase {
    constructor(
        @inject("VehicleRepository")
        private vehicleRepository: IVehicleRepository) { }

    async execute({ plate, type, km_per_lt, id }: IUpdateVehicleDTO): Promise<void> {

        // let route = 
        await this.vehicleRepository.update({
            plate, 
            type, 
            km_per_lt, 
            id
        })
    }

}

export { UpdateVehicleUseCase }