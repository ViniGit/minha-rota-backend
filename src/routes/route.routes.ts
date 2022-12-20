import { Router } from "express"
import { CreateRouteController } from "../modules/route/useCases/createRoute/CreateRouteController"

import { esureAuthenticated } from "../middlewares/ensureAuthenticated"
import { GetRouteController } from "../modules/route/useCases/getRoutes/GetRouteController"
import { InactivateRouteController } from "../modules/route/useCases/inactivateRoute/inactivateRouteController"
import { UpdateRouteController } from "../modules/route/useCases/updateRoute/UpdateRouteController"

const RouteRoutes = Router()

const createRouteController = new CreateRouteController()
const getRouteController = new GetRouteController()
const inactivateRouteController = new InactivateRouteController()
const updateRouteController = new UpdateRouteController()

RouteRoutes.use(esureAuthenticated)
RouteRoutes.post('/', createRouteController.handle)
RouteRoutes.put('/:id', updateRouteController.handle)
RouteRoutes.get('/', getRouteController.handle)
RouteRoutes.delete('/', inactivateRouteController.handle)

export { RouteRoutes }