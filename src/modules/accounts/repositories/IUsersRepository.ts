import { User } from "../entities/User"
import { ICreateUserDTO } from "./dtos/ICreateUserDTO"
import { IUpdateUserDTO } from "./dtos/IUpdateUserDTO"


interface IUsersRepository {
    create(data: ICreateUserDTO): Promise<void>
    findByEmail(email: string): Promise<User>
    findById(id: string): Promise<User>
    findByCPF(id: string): Promise<User>
    update(data: IUpdateUserDTO): Promise<void>
}

export { IUsersRepository }