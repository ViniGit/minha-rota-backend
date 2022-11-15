import { inject, injectable } from "tsyringe"
import { IVehicleRepository } from "../../repositories/IVehicleRepository"
import { Vehicle } from "../../entities/Vehicle"
interface IResponse {
    vehicle: Vehicle[],
    count: number
}

interface IRequest {
    user_id: string,
    take: number,
    skip: number
}

@injectable()
class GetVehicleUseCase {
    constructor(
        @inject("VehicleRepository")
        private routeRepository: IVehicleRepository) { }

    async execute({ user_id, take, skip }: IRequest): Promise<IResponse> {
        return await this.routeRepository.getAll(user_id, take, skip)
    }

}

export { GetVehicleUseCase }