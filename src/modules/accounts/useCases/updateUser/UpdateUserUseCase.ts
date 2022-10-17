import { inject, injectable } from "tsyringe"
import { hash } from 'bcrypt'
import { ICreateUserDTO } from "../../repositories/dtos/ICreateUserDTO"
import { IUsersRepository } from "../../repositories/IUsersRepository"
import { AppError } from "../../../../errors/AppError"
import { IUpdateUserDTO } from "../../repositories/dtos/IUpdateUserDTO"

@injectable()
class UpdateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository) { }

    async execute({ name, email, cpf, cell, birth_date, id }: IUpdateUserDTO): Promise<void> {

        const userEmailExists = await this.usersRepository.findById(id)

        if (userEmailExists) {
            await this.usersRepository.update({
                name,
                email,
                cpf,
                cell,
                birth_date,
                id
            })
        } else
            throw new AppError('User not exists')


    }

}

export { UpdateUserUseCase }