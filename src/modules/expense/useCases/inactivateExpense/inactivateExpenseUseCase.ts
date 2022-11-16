import { inject, injectable } from "tsyringe"
import { IExpenseRepository } from "../../repositories/IExpenseRepository"



@injectable()
class InactivateExpenseUseCase {
    constructor(
        @inject("ExpenseRepository")
        private expenseRepository: IExpenseRepository) { }

    async execute(id: string): Promise<void> {
        await this.expenseRepository.inactivate(id)
    }

}

export { InactivateExpenseUseCase }