import { inject, injectable } from "tsyringe"
import { IExpenseRepository } from "../../repositories/IExpenseRepository"
import { Expense } from "../../entities/Expense"
interface IResponse {
    expense: Expense[]
}

interface IReport {
    user_id: string,
    type: string,
    startDate: Date
    finalDate: Date
}

@injectable()
class GetExpenseReportUseCase {
    constructor(
        @inject("ExpenseRepository")
        private routeRepository: IExpenseRepository) { }

    async execute({ user_id, type, startDate, finalDate }: IReport): Promise<IResponse> {
        let report = await this.routeRepository.getReport({user_id, type, startDate, finalDate})
        return report
    }

}

export { GetExpenseReportUseCase }