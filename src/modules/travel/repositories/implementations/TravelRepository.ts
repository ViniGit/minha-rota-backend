import { Repository } from "typeorm"
import { AppDataSource } from "../../../../database/data-source";
import { AppError } from "../../../../errors/AppError"
import { Travel } from "../../entities/Travel";
import { ICreateTravelDTO } from "../dtos/ICreateTravelDTO";
import { ITravelRepository } from "../ITravelRepository";

interface IResponse {
    travel: Travel[],
    count: number
}

class TravelRepository implements ITravelRepository {
    private repository: Repository<Travel>

    constructor() {
        this.repository = AppDataSource.getRepository(Travel)
    }

    async create({ date, description, route_id, travels, user_id, vehicle_id }: ICreateTravelDTO): Promise<Travel> {
        const travel = this.repository.create({
            date,
            description,
            route_id,
            travels,
            user_id,
            vehicle_id
        })
        return this.repository.save(travel)
    }

    async getAll(user_id: string, take: number, skip: number): Promise<IResponse> {

        const count = await this.repository
            .createQueryBuilder('travel')
            .where('travel.user_id = :id', { id: user_id })
            .where('travel.inactive != :value', { value: true })
            .getCount()

        const travel = await this.repository
            .createQueryBuilder('travel')
            .leftJoinAndSelect("travel.route","route")
            .leftJoinAndSelect("travel.vehicle","vehicle")
            .where('travel.user_id = :id', { id: user_id })
            .where('travel.inactive != :value', { value: true })
            .orderBy('travel.created_at', 'DESC')
            .take(take)
            .skip(skip)
            .getMany()

        const data = {
            travel,
            count
        }

        return data
    }

    // async inactivate(id: string): Promise<void> {
    //     await this.repository.
    //         createQueryBuilder().
    //         update(Travel)
    //         .
    //         set({
    //             inactive: true,
    //         }).
    //         where("id = :id", { id: id }).
    //         execute()
    // }

    // async update(data: ICreateTravelDTO): Promise<void> {
    //     try {
    //         await this.repository.
    //             createQueryBuilder().
    //             update(Travel).
    //             set({
    //                 plate: data.plate,
    //                 type: data.type,
    //                 km_per_lt: data.km_per_lt,
    //                 // user_id: data.user,
    //             }).
    //             where("id = :id", { id: data.id }).
    //             // returning('*').
    //             execute()

    //         // return user.raw[0]
    //     } catch (error) {
    //         throw new AppError("Não foi possível atualizar o Veículo")
    //     }
    // }

}

export { TravelRepository }