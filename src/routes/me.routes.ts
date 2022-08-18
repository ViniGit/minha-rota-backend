import { Router } from "express"
import { GetUserByIdController } from "../modules/accounts/useCases/getUserByToken/GetUserByIdController"
import { esureAuthenticated } from "../middlewares/ensureAuthenticated"

const meRoutes = Router()

const getUserByTokenController = new GetUserByIdController()
meRoutes.use(esureAuthenticated)
meRoutes.get('/me', getUserByTokenController.handle)

export { meRoutes }