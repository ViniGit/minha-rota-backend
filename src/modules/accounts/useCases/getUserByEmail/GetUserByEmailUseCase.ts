import { inject, injectable } from "tsyringe"
import { hash } from 'bcrypt'
import { ICreateUserDTO } from "../../repositories/dtos/ICreateUserDTO"
import { IUsersRepository } from "../../repositories/IUsersRepository"
import { AppError } from "../../../../errors/AppError"

interface IResponse {
    id: string
    name: string
    email: string
    cpf: string
    cell: string
    birth_date: Date
}

@injectable()
class GetUserByEmailUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository) { }

    async execute(email: string): Promise<IResponse> {

        const user = await this.usersRepository.findByEmail(email)

        if (!user)
            throw new AppError('User not fount!')

        let returnUser = {
            id: user.id,
            name: user.name,
            email: user.email,
            cpf: user.cpf,
            cell: user.cell,
            birth_date: user.birth_date,
        }

        return returnUser
    }

}

export { GetUserByEmailUseCase }