import { Expense } from "../entities/Expense"
import { ICreateExpenseDTO, IUpdateExpenseDTO } from "./dtos/ICreateExpenseDTO"
interface IResponse {
    expense: Expense[],
    count: number
}
interface IExpenseRepository {
    create(data: ICreateExpenseDTO): Promise<Expense>
    getAll(user_id: string, take: number, skip: number): Promise<IResponse>
    inactivate(id: string): Promise<void>
    update(data: IUpdateExpenseDTO): Promise<void>
}

export { IExpenseRepository }