import { Expense } from "../entities/Expense"
import { ICreateExpenseDTO } from "./dtos/ICreateExpenseDTO"
interface IResponse {
    expense: Expense[],
    count: number
}

interface IReport {
    user_id: string,
    type: string,
    startDate: Date
    finalDate: Date
}
interface IExpenseRepository {
    create(data: ICreateExpenseDTO): Promise<Expense>
    getAll(user_id: string, take: number, skip: number): Promise<IResponse>
    inactivate(id: string): Promise<void>
    update(data: ICreateExpenseDTO): Promise<void>
    getReport(data: IReport): Promise<IResponse>
}

export { IExpenseRepository }