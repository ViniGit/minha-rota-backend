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

    async update({ name, email, cpf, cell, birth_date, id }: IUpdateUserDTO): Promise<User> {
        try {
            let user = await this.repository.
                createQueryBuilder().
                update(User).
                set({
                    name: name,
                    email: email,
                    cpf: cpf,
                    cell: cell,
                    birth_date: birth_date,
                }).
                where("id = :id", { id: id }).
                returning(['id', 'email', 'cpf', 'cell', 'birth_date', 'isAdmin', 'name']).
                execute()

            return user.raw[0]
        } catch (error) {
            throw new AppError("Não foi possível atualizar o usuário")
        }
    }

    async updatePassword(id: string, newPassword: string): Promise<void> {
        try {
            await this.repository.
                createQueryBuilder().
                update(User).
                set({
                    password: newPassword,
                }).
                where("id = :id", { id: id }).
                execute()

        } catch (err) {
            console.error(err)
            throw new AppError(err)
        }
    }
}

export { UsersRepository }