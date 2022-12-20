import { Router } from "express"
import { esureAuthenticated } from "../middlewares/ensureAuthenticated"
import { CreateExpenseController } from "../modules/expense/useCases/createExpense/CreateExpenseController"
import { GetExpenseController } from "../modules/expense/useCases/getExpense/GetExpenseController"
import { InactivateExpenseController } from "../modules/expense/useCases/inactivateExpense/inactivateExpenseController"
import { UpdateExpenseController } from "../modules/expense/useCases/updateVehicle/UpdateExpenseController"


const ExpenseRoutes = Router()

const createExpenseController = new CreateExpenseController()
const getExpenseController = new GetExpenseController()
const inactivateExpenseController = new InactivateExpenseController()
const updateExpenseController = new UpdateExpenseController()

ExpenseRoutes.use(esureAuthenticated)
ExpenseRoutes.post('/', createExpenseController.handle)
ExpenseRoutes.put('/:id', updateExpenseController.handle)
ExpenseRoutes.get('/', getExpenseController.handle)
ExpenseRoutes.delete('/', inactivateExpenseController.handle)

export { ExpenseRoutes }