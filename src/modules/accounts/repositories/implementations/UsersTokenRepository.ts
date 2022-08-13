import { ICreateUserTokenDTO } from "../dtos/ICreateUserTokenDTO"
import { IUsersTokenRepository } from "../IUsersTokensRepository"
import { Repository } from "typeorm"

import { UserTokens } from "../../entities/UserTokens"
import { AppDataSource } from "../../../../database/data-source"


class UsersTokenRepository implements IUsersTokenRepository {
    private respository: Repository<UserTokens>

    constructor() {
        this.respository = AppDataSource.getRepository(UserTokens)
    }

    async create({ expires_date, refresh_token, user_id }: ICreateUserTokenDTO): Promise<UserTokens> {
        const userToken = this.respository.create({
            expires_date,
            refresh_token,
            user_id
        })
        await this.respository.save(userToken)

        return userToken
    }

    async findByUserIdAndRefreshToken(user_id: string, refresh_token: string): Promise<UserTokens> {
        const usersTokens = await this.respository.findOne({ where: { user_id, refresh_token } })

        return usersTokens
    }

    async deleteById(id: string): Promise<void> {
        await this.respository.delete(id)
    }

    findByToken(token: string): Promise<UserTokens> {
        throw new Error("Method not implemented.")
    }


}


export { UsersTokenRepository }