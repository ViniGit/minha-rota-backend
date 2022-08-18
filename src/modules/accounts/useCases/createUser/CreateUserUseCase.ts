import { inject, injectable } from "tsyringe"
import { hash } from 'bcrypt'
import { ICreateUserDTO } from "../../repositories/dtos/ICreateUserDTO"
import { IUsersRepository } from "../../repositories/IUsersRepository"
import { AppError } from "../../../../errors/AppError"

@injectable()
class CreateUserUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository) { }

    async execute({ name, email, password, cpf, cell, birth_date }: ICreateUserDTO): Promise<void> {

        const userEmailExists = await this.usersRepository.findByEmail(email)
        const userCpfExists = await this.usersRepository.findByCPF(cpf)

        if (userEmailExists || userCpfExists)
            throw new AppError('User already exists')

        const passwordHash = await hash(password, 8)

        await this.usersRepository.create({
            name,
            email,
            password: passwordHash,
            cpf,
            cell,
            birth_date
        })
    }

}

export { CreateUserUseCase }