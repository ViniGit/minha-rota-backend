import { Route } from "../entities/Route"
import { ICreateRouteDTO } from "./dtos/ICreateRouteDTO"
interface IResponse {
    routes: Route[],
    count: number
}
interface IRouteRepository {
    create(data: ICreateRouteDTO): Promise<Route>
    getAll(user_id: string, take: number, skip: number): Promise<IResponse>
    inactivate(id: string): Promise<void>
    // findById(id: string): Promise<Route>
    // findByCPF(id: string): Promise<Route>
    // update(data: ICreateRouteDTO): Promise<void>
}

export { IRouteRepository }