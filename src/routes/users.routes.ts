import { Router } from "express"
import { CreateUserController } from "../modules/accounts/useCases/createUser/CreateUserController"

import { esureAuthenticated } from "../middlewares/ensureAuthenticated"
import { GetUserByEmailController } from "../modules/accounts/useCases/getUserByEmail/GetUserByEmailController"

const usersRoutes = Router()

const createUserController = new CreateUserController()
const getUserByEmailController = new GetUserByEmailController()
// usersRoutes.use(esureAuthenticated)
usersRoutes.post('/', createUserController.handle)
usersRoutes.get('/email', getUserByEmailController.handle)

export { usersRoutes }