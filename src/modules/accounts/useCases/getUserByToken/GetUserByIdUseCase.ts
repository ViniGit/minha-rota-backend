import { inject, injectable } from "tsyringe"
import { IUsersRepository } from "../../repositories/IUsersRepository"
import { AppError } from "../../../../errors/AppError"

interface IResponse {
    email: string,
    isAdmin: boolean,
    name: string
}

@injectable()
class GetUserByIdUseCase {
    constructor(
        @inject("UsersRepository")
        private usersRepository: IUsersRepository) { }

    async execute(id: string): Promise<IResponse> {
        const user = await this.usersRepository.findById(id)

        if (!user)
            throw new AppError('User does not exists!')

        return {
            email: user.email,
            isAdmin: user.isAdmin,
            name: user.name
        }
    }

}

export { GetUserByIdUseCase }