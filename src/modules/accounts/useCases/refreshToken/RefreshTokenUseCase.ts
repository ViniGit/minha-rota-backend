
import { decode, sign, verify } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'
import { AppError } from '../../../../errors/AppError'
import { IDateProvider } from '../../../../shared/container/providers/DateProvider/IDateProvider'
import { IUsersTokenRepository } from '../../repositories/IUsersTokensRepository'

interface IPayload {
    sub: string,
    email: string
}


interface ITokenResponse {
    token: string,
    refresh_token: string
}


@injectable()
class RefreshTokenUseCase {
    constructor(
        @inject("UsersTokenRepository")
        private usersTokensRepository: IUsersTokenRepository,
        @inject("DayjsDateProvider")
        private dateProvider: IDateProvider
    ) { }

    async execute(token: string): Promise<ITokenResponse> {
        const { email, sub } = verify(token, process.env.REFRESH_TOKEN_SECRET_KEY) as IPayload

        const user_id = sub

        const userToken = await this.usersTokensRepository.findByUserIdAndRefreshToken(user_id, token)

        if (!userToken) {
            throw new AppError("Refresh Token does not exists!")
        }

        await this.usersTokensRepository.deleteById(userToken.id)

        const refresh_token = sign({ email }, process.env.REFRESH_TOKEN_SECRET_KEY, {
            subject: sub,
            expiresIn: process.env.EXPIRES_REFRESH_TOKEN
        })

        await this.usersTokensRepository.create({
            expires_date: this.dateProvider.addDays(30),
            refresh_token,
            user_id,
        })

        const newToken = sign({}, process.env.TOKEN_SECRET_KEY, {
            subject: user_id,
            expiresIn: process.env.EXPIRES_TOKEN
        })

        return {
            refresh_token,
            token: newToken
        }

    }
}


export { RefreshTokenUseCase }

