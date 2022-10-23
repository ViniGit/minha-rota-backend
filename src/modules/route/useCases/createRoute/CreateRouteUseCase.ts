import { inject, injectable } from "tsyringe"
import { hash } from 'bcrypt'
import { AppError } from "../../../../errors/AppError"
import { ICreateRouteDTO } from "../../repositories/dtos/ICreateRouteDTO"
import { IRouteRepository } from "../../repositories/IRouteRepository"

@injectable()
class CreateRouteUseCase {
    constructor(
        @inject("RouteRepository")
        private routeRepository: IRouteRepository) { }

    async execute({ destination, distance, price, user }: ICreateRouteDTO): Promise<void> {

        // const userEmailExists = await this.usersRepository.findByEmail(email)
        // const userCpfExists = await this.usersRepository.findByCPF(cpf)

        // if (userEmailExists || userCpfExists)
        //     throw new AppError('User already exists')

        // const passwordHash = await hash(password, 8)

        await this.routeRepository.create({
            destination, 
            distance, 
            price, 
            user
        })
    }

}

export { CreateRouteUseCase }