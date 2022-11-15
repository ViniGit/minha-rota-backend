import { Repository } from "typeorm"
import { AppDataSource } from "../../../../database/data-source";
import { AppError } from "../../../../errors/AppError"
import { Vehicle } from "../../entities/Vehicle";
import { ICreateVehicleDTO, IUpdateVehicleDTO } from "../dtos/ICreateVehicleDTO";
import { IVehicleRepository } from "../IVehicleRepository";

interface IResponse {
    vehicle: Vehicle[],
    count: number
}
interface IRequest {
    user_id: string,
    take: number,
    skip: number
}
class VehicleRepository implements IVehicleRepository {
    private repository: Repository<Vehicle>

    constructor() {
        this.repository = AppDataSource.getRepository(Vehicle)
    }

    async create({ plate, type, km_per_lt, user }: ICreateVehicleDTO): Promise<Vehicle> {
        const vehicle = this.repository.create({
            plate,
            type,
            km_per_lt,
            user_id: user,
        })
        return this.repository.save(vehicle)
    }

    async getAll(user_id: string, take: number, skip: number): Promise<IResponse> {

        const count = await this.repository
            .createQueryBuilder('vehicle')
            .where('vehicle.user_id = :id', { id: user_id })
            .where('vehicle.inactive != :value', { value: true })
            .getCount()

        const vehicle = await this.repository
            .createQueryBuilder('vehicle')
            .select(['vehicle.plate', 'vehicle.type', 'vehicle.km_per_lt', 'vehicle.id'])
            .where('vehicle.user_id = :id', { id: user_id })
            .where('vehicle.inactive != :value', { value: true })
            .orderBy('created_at', 'DESC')
            .take(take)
            .skip(skip)
            .getMany()

        const data = {
            vehicle,
            count
        }

        return data
    }

    async inactivate(id: string): Promise<void> {
        await this.repository.
            createQueryBuilder().
            update(Vehicle)
            .
            set({
                inactive: true,
            }).
            where("id = :id", { id: id }).
            execute()
    }

    async update(data: IUpdateVehicleDTO): Promise<void> {
        try {
            await this.repository.
                createQueryBuilder().
                update(Vehicle).
                set({
                    plate: data.plate,
                    type: data.type,
                    km_per_lt: data.km_per_lt,
                    // user_id: data.user,
                }).
                where("id = :id", { id: data.id }).
                // returning('*').
                execute()

            // return user.raw[0]
        } catch (error) {
            throw new AppError("Não foi possível atualizar o Veículo")
        }
    }

}

export { VehicleRepository }