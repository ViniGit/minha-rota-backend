import { inject, injectable } from "tsyringe"
import { IUpdateExpenseDTO } from "../../repositories/dtos/ICreateExpenseDTO"
import { IExpenseRepository } from "../../repositories/IExpenseRepository"

@injectable()
class UpdateExpenseUseCase {
    constructor(
        @inject("ExpenseRepository")
        private expenseRepository: IExpenseRepository) { }

    async execute({ description, type, value, id }: IUpdateExpenseDTO): Promise<void> {

        await this.expenseRepository.update({
            description,
            type,
            value,
            id
        })
    }

}

export { UpdateExpenseUseCase }