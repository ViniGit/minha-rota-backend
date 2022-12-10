import { Router } from "express"
import { esureAuthenticated } from "../middlewares/ensureAuthenticated"
import { CreateTravelController } from "../modules/travel/useCases/createTravel/CreateTravelController"
import { GetTravelController } from "../modules/travel/useCases/getVehicle/GetTravelController"


const TravelRoutes = Router()

const createTravelController = new CreateTravelController()
const getTravelController = new GetTravelController()
// const getVehicleController = new GetVehicleController()
// const inactivateVehicleController = new InactivateVehicleController()
// const inactivateRouteController = new InactivateRouteController()
// const updateVehicleController = new UpdateVehicleController()

TravelRoutes.use(esureAuthenticated)
TravelRoutes.post('/', createTravelController.handle)
// TravelRoutes.put('/:id', updateVehicleController.handle)
TravelRoutes.get('/', getTravelController.handle)
// TravelRoutes.delete('/', inactivateVehicleController.handle)

export { TravelRoutes }