import { inject, injectable } from "tsyringe"
import { IUsersRepository } from "../../repositories/IUsersRepository"
import { compare } from "bcrypt"

import { sign } from 'jsonwebtoken'
import { AppError } from "../../../../errors/AppError"
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider"

interface IRequest {
    email: string
    password: string
}

interface IResponse {
    user: {
        name: string,
        email: string
    },
    token: string,
    refresh_token: string,
    isAdmin: Boolean
}

@injectable()
class AuthenticateUserUseCase {
    constructor(@inject("UsersRepository")
    private usersRepository: IUsersRepository,
        @inject("UsersTokenRepository")
        private UsersTokenRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider
    ) { }

    async execute({ email, password }: IRequest): Promise<IResponse> {
        const user = await this.usersRepository.findByEmail(email)

        if (!user) {
            throw new AppError("Email or password incorrect")
        }
        const passwordMatch = await compare(password, user.password)

        if (!passwordMatch) {
            throw new AppError("Email or password incorrect")
        }

        const token = sign({}, process.env.TOKEN_SECRET_KEY, {
            subject: user.id,
            expiresIn: process.env.EXPIRES_TOKEN
        })

        const refresh_token = sign({ email }, process.env.REFRESH_TOKEN_SECRET_KEY, {
            subject: user.id,
            expiresIn: process.env.EXPIRES_REFRESH_TOKEN
        })

        await this.UsersTokenRepository.create({
            user_id: user.id,
            refresh_token,
            expires_date: this.dateProvider.addDays(30)
        })

        const tokenReturn: IResponse = {
            token,
            user: {
                name: user.name,
                email: user.email
            },
            refresh_token,
            isAdmin: user.isAdmin
        }

        return tokenReturn
    }
}

export { AuthenticateUserUseCase }