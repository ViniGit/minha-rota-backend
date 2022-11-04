import { Router } from "express"
import { authenticateRoutes } from "./authenticate.routes"
import { usersRoutes } from "./users.routes"
import { meRoutes } from "./me.routes"
import { RouteRoutes } from "./route.routes"
import { passwordRoutes } from "./password.routes"

const router = Router()

router.use("/password", passwordRoutes)
router.use("/users", usersRoutes)
router.use("/route", RouteRoutes)
router.use(meRoutes)
router.use(authenticateRoutes)


export { router }