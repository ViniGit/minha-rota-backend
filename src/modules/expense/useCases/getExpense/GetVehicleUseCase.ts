import { inject, injectable } from "tsyringe"
import { IExpenseRepository } from "../../repositories/IExpenseRepository"
import { Expense } from "../../entities/Expense"
interface IResponse {
    expense: Expense[],
    count: number
}

interface IRequest {
    user_id: string,
    take: number,
    skip: number
}

@injectable()
class GetExpenseUseCase {
    constructor(
        @inject("ExpenseRepository")
        private routeRepository: IExpenseRepository) { }

    async execute({ user_id, take, skip }: IRequest): Promise<IResponse> {
        return await this.routeRepository.getAll(user_id, take, skip)
    }

}

export { GetExpenseUseCase }