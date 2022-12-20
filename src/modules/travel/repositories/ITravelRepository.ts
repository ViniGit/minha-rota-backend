import { Travel } from "../entities/Travel"
import { ICreateTravelDTO } from "./dtos/ICreateTravelDTO"
interface IResponse {
    travel: Travel[],
    count: number,
    lastElement: Travel
}
interface ITravelRepository {
    create(data: ICreateTravelDTO): Promise<Travel>
    getAll(user_id: string, take: number, skip: number): Promise<IResponse>
    inactivate(id: string): Promise<void>
    update(data: ICreateTravelDTO): Promise<void>
}

export { ITravelRepository }