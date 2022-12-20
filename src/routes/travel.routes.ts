import { Router } from "express"
import { esureAuthenticated } from "../middlewares/ensureAuthenticated"
import { CreateTravelController } from "../modules/travel/useCases/createTravel/CreateTravelController"
import { GetTravelController } from "../modules/travel/useCases/getTravel/GetTravelController"
import { InactivateTravelController } from "../modules/travel/useCases/inactivateTravel/inactivateTravelController"
import { UpdateTravelController } from "../modules/travel/useCases/updateTravel/UpdateTravelController"


const TravelRoutes = Router()

const createTravelController = new CreateTravelController()
const getTravelController = new GetTravelController()
const updateTravelController = new UpdateTravelController()
const inactivateTravelController = new InactivateTravelController()

TravelRoutes.use(esureAuthenticated)
TravelRoutes.post('/', createTravelController.handle)
TravelRoutes.put('/:id', updateTravelController.handle)
TravelRoutes.get('/', getTravelController.handle)
TravelRoutes.delete('/', inactivateTravelController.handle)

export { TravelRoutes }