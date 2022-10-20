import { inject, injectable } from "tsyringe"
import { compare, hash } from 'bcrypt'
import { User } from "../../entities/User";
import { ICreateUserDTO } from "../../repositories/dtos/ICreateUserDTO"
import { IUsersRepository } from "../../repositories/IUsersRepository"
import { AppError } from "../../../../errors/AppError"
import { IUpdateUserDTO } from "../../repositories/dtos/IUpdateUserDTO"

@injectable()
class UpdateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository) { }

    async execute({ name, email, cpf, cell, birth_date, id }: IUpdateUserDTO): Promise<User> {

        const userEmailExists = await this.usersRepository.findById(id)

        if (userEmailExists) {
            let user = await this.usersRepository.update({
                name,
                email,
                cpf,
                cell,
                birth_date,
                id
            })

            return user
        } else
            throw new AppError('User not exists')
    }

    async verifyOldPassword(currentPassword: string, email: string): Promise<Boolean> {

        const user = await this.usersRepository.findByEmail(email)
        const passwordMatch = await compare(currentPassword, user.password)

        if (!passwordMatch) {
            throw new AppError('Senha incorreta!')
        }

        return true
    }

    async updatePassword(id: string, newPassword: string): Promise<void> {
        const passwordHash = await hash(newPassword, 8)
        await this.usersRepository.updatePassword(id, passwordHash)
    }

}

export { UpdateUserUseCase }