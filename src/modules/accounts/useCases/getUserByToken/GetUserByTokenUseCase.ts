import { inject, injectable } from "tsyringe"
import { IUsersRepository } from "../../repositories/IUsersRepository"
import { AppError } from "../../../../errors/AppError"

interface IResponse {
    email: string,
    isAdmin: boolean
}

@injectable()
class GetUserByTokenUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository) { }

    async execute(id: string): Promise<IResponse> {
        const user = await this.usersRepository.findById(id)

        if (!user)
            throw new AppError('User does not exists!')

        return {
            email: user.email,
            isAdmin: user.isAdmin
        }
    }

}

export { GetUserByTokenUseCase }