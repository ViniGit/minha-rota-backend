import { Repository } from "typeorm"
import { AppDataSource } from "../../../../database/data-source";
import { User } from "../../entities/User";
import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { IUpdateUserDTO } from "../dtos/IUpdateUserDTO";
import { IUsersRepository } from "../IUsersRepository";
import { AppError } from "../../../../errors/AppError"

class UsersRepository implements IUsersRepository {
    private repository: Repository<User>

    constructor() {
        this.repository = AppDataSource.getRepository(User)
    }

    async create({ name, email, password, cpf, cell, birth_date }: ICreateUserDTO): Promise<void> {
        const user = this.repository.create({
            name,
            email,
            password,
            cpf,
            cell,
            birth_date
        })
        await this.repository.save(user)
    }

    async findByEmail(email: string): Promise<User> {
        const user = await this.repository.findOne({ where: { email: email } })
        return user
    }

    async findById(id: string): Promise<User> {
        const user = await this.repository.findOne({ where: { id: id } })
        return user
    }

    async findByCPF(cpf: string): Promise<User> {
        const user = await this.repository.findOne({ where: { cpf: cpf } })
        return user
    }

    async update({ name, email, cpf, cell, birth_date, id }: IUpdateUserDTO): Promise<void> {
        try {
            await this.repository.update({
                id: id,
            }, {
                name: name,
                email: email,
                cpf: cpf,
                cell: cell,
                birth_date: birth_date,
            })
        } catch (error) {
            throw new AppError("Não foi possível atualizar o usuário")
        }
    }
}

export { UsersRepository }