import { Route } from "../entities/Route"
import { ICreateRouteDTO } from "./dtos/ICreateRouteDTO"


interface IRouteRepository {
    create(data: ICreateRouteDTO): Promise<void>
    // findByEmail(email: string): Promise<Route>
    // findById(id: string): Promise<Route>
    // findByCPF(id: string): Promise<Route>
    // update(data: ICreateRouteDTO): Promise<void>
}

export { IRouteRepository }