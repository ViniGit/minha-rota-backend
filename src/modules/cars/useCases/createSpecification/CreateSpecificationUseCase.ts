import { AppError } from "../../../../errors/AppError";
import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository";

interface IRequest {
    name: String,
    description: String
}

class CreateEspecificationUseCase {
    constructor(private specificationsRepository: ISpecificationsRepository) {
    }

    execute({ name, description }: IRequest): void {

        const specificationAlreadyExists = this.specificationsRepository.findByName(name)

        if (specificationAlreadyExists) {
            throw new AppError("Specification already exists!")
        }

        this.specificationsRepository.create({
            name,
            description
        })
    }

}


export { CreateEspecificationUseCase }