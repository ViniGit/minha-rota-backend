import { Router } from "express"
import { CreateUserController } from "../modules/accounts/useCases/createUser/CreateUserController"

import { esureAuthenticated } from "../middlewares/ensureAuthenticated"
import { GetUserByEmailController } from "../modules/accounts/useCases/getUserByEmail/GetUserByEmailController"
import { UpdateUserController } from "../modules/accounts/useCases/updateUser/UpdateUserController"

const usersRoutes = Router()

const createUserController = new CreateUserController()
const getUserByEmailController = new GetUserByEmailController()
const updateUserController = new UpdateUserController()
// usersRoutes.use(esureAuthenticated)
usersRoutes.post('/', createUserController.handle)
usersRoutes.get('/:email', getUserByEmailController.handle)
usersRoutes.put('/:id', updateUserController.handle)

export { usersRoutes }