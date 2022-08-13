import { Specification } from "../model/Specification"

interface ICreateSpecificationDTO{
    name: String
    description: String
}

interface ISpecificationsRepository {
    create({  name, description }: ICreateSpecificationDTO): void
    findByName(name: String) : Specification
}

export { ISpecificationsRepository, ICreateSpecificationDTO }

