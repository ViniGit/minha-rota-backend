import { Repository } from "typeorm"
import { AppDataSource } from "../../../../database/data-source";
import { User } from "../../entities/User";
import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { IUsersRepository } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
    private repository: Repository<User>

    constructor() {
        this.repository = AppDataSource.getRepository(User)
    }


    async create({ name, email, password, cpf, birth_date }: ICreateUserDTO): Promise<void> {
        const user = this.repository.create({
            name,
            email,
            password,
            cpf,
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

}

export { UsersRepository }