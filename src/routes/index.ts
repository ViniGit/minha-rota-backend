import { Router } from "express"
import { authenticateRoutes } from "./authenticate.routes"
import { usersRoutes } from "./users.routes"
import { meRoutes } from "./me.routes"
import { RouteRoutes } from "./route.routes"
import { passwordRoutes } from "./password.routes"
import { VehicleRoutes } from "./vehicle.routes"
import { ExpenseRoutes } from "./expense.routes"
import { TravelRoutes } from "./travel.routes"

const router = Router()

router.use("/password", passwordRoutes)
router.use(authenticateRoutes)

router.use("/route", RouteRoutes)
router.use("/travel", TravelRoutes)
router.use("/expense", ExpenseRoutes)
router.use("/vehicle", VehicleRoutes)
router.use("/users", usersRoutes)
router.use(meRoutes)


export { router }