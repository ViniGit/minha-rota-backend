import { Router } from "express"
import { CreateUserController } from "../modules/accounts/useCases/createUser/CreateUserController"
import { esureAuthenticated } from "../middlewares/ensureAuthenticated"

const usersRoutes = Router()

const createUserController = new CreateUserController()
// usersRoutes.use(esureAuthenticated)
usersRoutes.post('/', createUserController.handle)

export { usersRoutes }