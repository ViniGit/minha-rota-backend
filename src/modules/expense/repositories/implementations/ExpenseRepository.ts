import { Repository, getManager } from "typeorm"
import { AppDataSource } from "../../../../database/data-source";
import { AppError } from "../../../../errors/AppError"
import { Expense } from "../../entities/Expense";
import { ICreateExpenseDTO } from "../dtos/ICreateExpenseDTO";
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

interface IReport {
    user_id: string,
    type: string,
    startDate: Date
    finalDate: Date
}
class ExpenseRepository implements IExpenseRepository {
    private repository: Repository<Expense>

    constructor() {
        this.repository = AppDataSource.getRepository(Expense)
    }
    // @ts-ignore
    async getReport(data: IReport): Promise<Expense[]> {

        const query = getReportQuery(this.repository, data)

        query.orderBy('created_at', 'ASC')

        // @TO DO ARRUMAR ESSA QUERY E BOTAR PRA BUSCAR POR ORDEM DE DATA
        const report = await query.getMany()

        const queryTotal = getReportQuery(this.repository, data)

        const totalValue = await queryTotal
            .select('SUM(expense.value)', 'totalValue')
            .getRawOne()

        // @ts-ignore
        return { report, totalValue }

    }



    async create({ description, type, value, user, route }: ICreateExpenseDTO): Promise<Expense> {
        const expense = this.repository.create({
            description,
            type,
            value,
            route_id: route,
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
            .select(['expense.description', 'expense.type', 'expense.value', 'expense.id', 'expense.route_id'])
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

    async update(data: ICreateExpenseDTO): Promise<void> {
        try {
            await this.repository.
                createQueryBuilder().
                update(Expense).
                set({
                    description: data.description,
                    route_id: data.route,
                    type: data.type,
                    value: data.value,
                    // user_id: data.user,
                }).
                where("id = :id", { id: data.user }).
                // returning('*').
                execute()

            // return user.raw[0]
        } catch (error) {
            throw new AppError("Não foi possível atualizar a Despesa.")
        }
    }

}

function getReportQuery(repository: Repository<Expense>, data: IReport) {
    try {
        const query = repository
            .createQueryBuilder('expense')
            .where('expense.user_id = :id', { id: data.user_id })

        if (data.type)
            query.andWhere('expense.type = :type', { type: data.type })

        if (data.startDate && data.finalDate) {
            query.andWhere('expense.created_at >= :startDate', { startDate: data.startDate })
            query.andWhere('expense.created_at <= :finalDate', { finalDate: data.finalDate })
        }

        return query
    } catch (error) {

        throw new AppError("[getReportQuery] Erro ao realizar a consulta no banco.")
    }
}

export { ExpenseRepository }