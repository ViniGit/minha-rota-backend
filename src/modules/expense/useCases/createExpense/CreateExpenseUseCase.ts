import { inject, injectable } from "tsyringe"
import { ICreateExpenseDTO } from "../../repositories/dtos/ICreateExpenseDTO"
import { IExpenseRepository } from "../../repositories/IExpenseRepository"
import { Expense } from "../../entities/Expense"

@injectable()
class CreateExpenseUseCase {
    constructor(
        @inject("ExpenseRepository")
        private expenseRepository: IExpenseRepository) { }

    async execute({ description, type, value, user }: ICreateExpenseDTO): Promise<Expense> {

        let expense = await this.expenseRepository.create({
            description,
            type,
            value,
            user
        })

        return expense
    }

}

export { CreateExpenseUseCase }