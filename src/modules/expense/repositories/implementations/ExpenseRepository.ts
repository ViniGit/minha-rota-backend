import { Repository } from "typeorm"
import { AppDataSource } from "../../../../database/data-source";
import { AppError } from "../../../../errors/AppError"
import { Expense } from "../../entities/Expense";
import { ICreateExpenseDTO, IUpdateExpenseDTO } from "../dtos/ICreateExpenseDTO";
import { IExpenseRepository } from "../IExpenseRepository";

interface IResponse {
    expense: Expense[],
    count: number
}
interface IRequest {
    user_id: string,
    take: number,
    skip: number
}
class ExpenseRepository implements IExpenseRepository {
    private repository: Repository<Expense>

    constructor() {
        this.repository = AppDataSource.getRepository(Expense)
    }

    async create({ description, type, value, user }: ICreateExpenseDTO): Promise<Expense> {
        const expense = this.repository.create({
            description,
            type,
            value,
            user_id: user,
        })
        return this.repository.save(expense)
    }

    async getAll(user_id: string, take: number, skip: number): Promise<IResponse> {

        const count = await this.repository
            .createQueryBuilder('expense')
            .where('expense.user_id = :id', { id: user_id })
            .where('expense.inactive != :value', { value: true })
            .getCount()

        const expense = await this.repository
            .createQueryBuilder('expense')
            .select(['expense.description', 'expense.type', 'expense.value', 'expense.id'])
            .where('expense.user_id = :id', { id: user_id })
            .where('expense.inactive != :value', { value: true })
            .orderBy('created_at', 'DESC')
            .take(take)
            .skip(skip)
            .getMany()

        const data = {
            expense,
            count
        }

        return data
    }

    async inactivate(id: string): Promise<void> {
        await this.repository.
            createQueryBuilder().
            update(Expense)
            .
            set({
                inactive: true,
            }).
            where("id = :id", { id: id }).
            execute()
    }

    async update(data: IUpdateExpenseDTO): Promise<void> {
        try {
            await this.repository.
                createQueryBuilder().
                update(Expense).
                set({
                    description: data.description,
                    type: data.type,
                    value: data.value,
                    // user_id: data.user,
                }).
                where("id = :id", { id: data.id }).
                // returning('*').
                execute()

            // return user.raw[0]
        } catch (error) {
            throw new AppError("Não foi possível atualizar a Despesa.")
        }
    }

}

export { ExpenseRepository }