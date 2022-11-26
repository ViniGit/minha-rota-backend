import { inject, injectable } from "tsyringe"
import { ICreateExpenseDTO } from "../../repositories/dtos/ICreateExpenseDTO"
import { IExpenseRepository } from "../../repositories/IExpenseRepository"

@injectable()
class UpdateExpenseUseCase {
    constructor(
        @inject("ExpenseRepository")
        private expenseRepository: IExpenseRepository) { }

    async execute({ description, type, value, user, route }: ICreateExpenseDTO): Promise<void> {

        await this.expenseRepository.update({
            description,
            route,
            type,
            value,
            user
        })
    }

}

export { UpdateExpenseUseCase }