import { Router } from "express"
import { GetUserByTokenController } from "../modules/accounts/useCases/getUserByToken/GetUserByTokenController"
import { esureAuthenticated } from "../middlewares/ensureAuthenticated"

const meRoutes = Router()

const getUserByTokenController = new GetUserByTokenController()
meRoutes.use(esureAuthenticated)
meRoutes.get('/me', getUserByTokenController.handle)

export { meRoutes }