import { Router } from "express"
import { CreateRouteController } from "../modules/route/useCases/createRoute/CreateRouteController"

import { esureAuthenticated } from "../middlewares/ensureAuthenticated"
import { GetUserByEmailController } from "../modules/accounts/useCases/getUserByEmail/GetUserByEmailController"
import { UpdateUserController } from "../modules/accounts/useCases/updateUser/UpdateUserController"

const RouteRoutes = Router()

const createRouteController = new CreateRouteController()

RouteRoutes.use(esureAuthenticated)
RouteRoutes.post('/', createRouteController.handle)

export { RouteRoutes }