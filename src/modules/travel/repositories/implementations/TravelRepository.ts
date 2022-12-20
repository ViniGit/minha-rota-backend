import { Repository } from "typeorm"
import { AppDataSource } from "../../../../database/data-source";
import { AppError } from "../../../../errors/AppError"
import { Travel } from "../../entities/Travel";
import { ICreateTravelDTO } from "../dtos/ICreateTravelDTO";
import { ITravelRepository } from "../ITravelRepository";

interface IResponse {
    travel: Travel[],
    count: number,
    lastElement: Travel
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
            .leftJoinAndSelect("travel.route", "route")
            .leftJoinAndSelect("travel.vehicle", "vehicle")
            .where('travel.user_id = :id', { id: user_id })
            .where('travel.inactive != :value', { value: true })
            .orderBy('travel.created_at', 'DESC') 
            .take(take)
            .skip(skip)
            .getMany()

        const lastElement = await this.repository
        .createQueryBuilder('travel')
        .where('travel.inactive != :value', { value: true })
        .orderBy('travel.id', 'DESC') 
        .limit(1)
        .getOne()
        // .where('travel.id = (select max(travel.id)')

        const data = {
            travel,
            count,
            lastElement
        }

        return data
    }

    async inactivate(id: string): Promise<void> {
        await this.repository.
            createQueryBuilder().
            update(Travel)
            .
            set({
                inactive: true,
            }).
            where("id = :id", { id: id }).
            execute()
    }

    async update(data: ICreateTravelDTO): Promise<void> {
        try {
            await this.repository.
                createQueryBuilder('travel').
                update(Travel).
                set({
                    date: data.date,
                    description: data.description,
                    route_id: data.route_id,
                    travels: data.travels,
                    vehicle_id: data.vehicle_id
                }
                ).
                where("id = :id", { id: parseInt(data.user_id) }).
                // returning('*').
                execute()

            // return user.raw[0]
        } catch (error) {
            throw new AppError("Não foi possível atualizar o registro da Viagem.")
        }
    }

}

export { TravelRepository }