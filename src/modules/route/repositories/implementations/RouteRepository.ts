import { Repository } from "typeorm"
import { AppDataSource } from "../../../../database/data-source";
import { AppError } from "../../../../errors/AppError"
import { Route } from "../../entities/Route";
import { ICreateRouteDTO } from "../dtos/ICreateRouteDTO";
import { IRouteRepository } from "../IRouteRepository";

class RouteRepository implements IRouteRepository {
    private repository: Repository<Route>

    constructor() {
        this.repository = AppDataSource.getRepository(Route)
    }
    async create(data: ICreateRouteDTO): Promise<void> {
        // const route = this.repository.create(data)
        // await this.repository.save(data)
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
    update(data: ICreateRouteDTO): Promise<void> {
        throw new Error("Method not implemented.");
    }

    
}

export { RouteRepository }