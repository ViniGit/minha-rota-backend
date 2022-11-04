import { hash } from "bcrypt";
import { inject, injectable } from "tsyringe";
import { AppError } from "../../../../errors/AppError";
import { IDateProvider } from "../../../../shared/container/providers/DateProvider/IDateProvider";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { IUsersTokenRepository } from "../../repositories/IUsersTokensRepository";
interface IRequest {
    token: string,
    password: string
}

@injectable()
class ResetPasswordUserUseCase {
    constructor(
        @inject('UsersTokenRepository')
        private usersTokenRepository: IUsersTokenRepository,
        @inject('DayjsDateProvider')
        private datePRovider: IDateProvider,
        @inject('UsersRepository')
        private usersRepository: IUsersRepository
    ) { }

    async execute({ token, password }: IRequest): Promise<void> {
        const userToken = await this.usersTokenRepository.findByRefreshToken(token)

        if (!userToken)
            throw new AppError('Token invalid!')

        if (this.datePRovider.compareIfBefore(userToken.expires_date, this.datePRovider.dateNow())) {
            throw new AppError('Token expired!')
        }

        const user = await this.usersRepository.findById(userToken.user_id)

        user.password = await hash(password, 8)

        await this.usersRepository.updatePassword(user.id, user.password)

        await this.usersTokenRepository.deleteById(userToken.id)

    }

}

export { ResetPasswordUserUseCase }