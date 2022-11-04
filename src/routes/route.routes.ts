import { Router } from "express"
import { CreateRouteController } from "../modules/route/useCases/createRoute/CreateRouteController"

import { esureAuthenticated } from "../middlewares/ensureAuthenticated"
import { GetUserByEmailController } from "../modules/accounts/useCases/getUserByEmail/GetUserByEmailController"
import { UpdateUserController } from "../modules/accounts/useCases/updateUser/UpdateUserController"
import { GetRouteController } from "../modules/route/useCases/getRoutes/GetRouteController"
import { InactivateRouteController } from "../modules/route/useCases/inactivateRoute/inactivateRouteController"

const RouteRoutes = Router()

const createRouteController = new CreateRouteController()
const getRouteController = new GetRouteController()
const inactivateRouteController = new InactivateRouteController()

RouteRoutes.use(esureAuthenticated)
RouteRoutes.post('/', createRouteController.handle)
RouteRoutes.get('/', getRouteController.handle)
RouteRoutes.delete('/', inactivateRouteController.handle)

export { RouteRoutes }