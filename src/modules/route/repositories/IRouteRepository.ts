import { Route } from "../entities/Route"
import { ICreateRouteDTO, IUpdateRouteDTO } from "./dtos/ICreateRouteDTO"
interface IResponse {
    routes: Route[],
    count: number
}
interface IRouteRepository {
    create(data: ICreateRouteDTO): Promise<Route>
    getAll(user_id: string, take: number, skip: number): Promise<IResponse>
    inactivate(id: string): Promise<void>
    update(data: IUpdateRouteDTO): Promise<void>
}

export { IRouteRepository }