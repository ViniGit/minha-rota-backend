import { Repository } from "typeorm"
import { AppDataSource } from "../../../../database/data-source";
import { AppError } from "../../../../errors/AppError"
import { Route } from "../../entities/Route";
import { ICreateRouteDTO, IUpdateRouteDTO } from "../dtos/ICreateRouteDTO";
import { IRouteRepository } from "../IRouteRepository";

interface IResponse {
    routes: Route[],
    count: number
}
interface IRequest {
    user_id: string,
    take: number,
    skip: number
}
class RouteRepository implements IRouteRepository {
    private repository: Repository<Route>

    constructor() {
        this.repository = AppDataSource.getRepository(Route)
    }

    async countRoutes(user_id: string): Promise<Number> {
        const count = await this.repository
            .createQueryBuilder('route')
            .where('route.user_id = :id', { id: user_id })
            .where('route.inactive != :value', { value: true })
            .getCount()

        return count
    }

    async create({ destination, distance, price, user }: ICreateRouteDTO): Promise<Route> {
        const route = this.repository.create({
            destination,
            distance,
            price,
            user_id: user,
        })
        return this.repository.save(route)
    }

    async getAll(user_id: string, take: number, skip: number): Promise<IResponse> {

        const count = await this.repository
            .createQueryBuilder('route')
            .where('route.user_id = :id', { id: user_id })
            .where('route.inactive != :value', { value: true })
            .getCount()

        const routes = await this.repository
            .createQueryBuilder('route')
            .select(['route.destination', 'route.distance', 'route.price', 'route.id'])
            .where('route.user_id = :id', { id: user_id })
            .where('route.inactive != :value', { value: true })
            .orderBy('created_at', 'DESC')
            .take(take)
            .skip(skip)
            .getMany()

        const data = {
            routes,
            count
        }

        return data
    }

    async inactivate(id: string): Promise<void> {
        await this.repository.
            createQueryBuilder().
            update(Route)
            .
            set({
                inactive: true,
            }).
            where("id = :id", { id: id }).
            execute()
    }

    async update(data: IUpdateRouteDTO): Promise<void> {
        try {
            // let user = 
            await this.repository.
                createQueryBuilder().
                update(Route).
                set({
                    destination: data.destination,
                    distance: data.distance,
                    price: data.price,
                    // user_id: data.user,
                }).
                where("id = :id", { id: data.id }).
                // returning('*').
                execute()

            // return user.raw[0]
        } catch (error) {
            throw new AppError("Não foi possível atualizar o usuário")
        }
    }

    findByEmail(email: string): Promise<Route> {
        throw new Error("Method not implemented.");
    }
    findById(id: string): Promise<Route> {
        throw new Error("Method not implemented.");
    }
    findByCPF(id: string): Promise<Route> {
        throw new Error("Method not implemented.");
    }



}

export { RouteRepository }