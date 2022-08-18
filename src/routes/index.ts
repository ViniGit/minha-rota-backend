import { Router } from "express"
import { authenticateRoutes } from "./authenticate.routes"
import { usersRoutes } from "./users.routes"
import { meRoutes } from "./me.routes"

const router = Router()

router.use("/users", usersRoutes)
router.use(authenticateRoutes)
router.use(meRoutes)


export { router }