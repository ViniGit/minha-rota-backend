import { inject, injectable } from "tsyringe"
import { hash } from 'bcrypt'
import { ICreateUserDTO } from "../../repositories/dtos/ICreateUserDTO"
import { IUsersRepository } from "../../repositories/IUsersRepository"
import { AppError } from "../../../../errors/AppError"

@injectable()
class GetUserByEmailUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository) { }

    async execute( email : string): Promise<ICreateUserDTO> {

        const user = await this.usersRepository.findByEmail(email)

        if (!user)
            throw new AppError('User not fount!')
            
        return user
    }

}

export { GetUserByEmailUseCase }