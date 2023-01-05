import { Vehicle } from "../entities/Vehicle"
import { ICreateVehicleDTO, IUpdateVehicleDTO } from "./dtos/ICreateVehicleDTO"
interface IResponse {
    vehicle: Vehicle[],
    count: number
}
interface IVehicleRepository {
    create(data: ICreateVehicleDTO): Promise<Vehicle>
    getAll(user_id: string, take: number, skip: number): Promise<IResponse>
    inactivate(id: string): Promise<void>
    update(data: IUpdateVehicleDTO): Promise<void>
    findByPlate(plate: string): Promise<Vehicle>
}

export { IVehicleRepository }