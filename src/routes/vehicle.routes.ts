import { Router } from "express"
import { esureAuthenticated } from "../middlewares/ensureAuthenticated"
import { CreateVehicleController } from "../modules/vehicle/useCases/createVehicle/CreateVehicleController"
import { GetVehicleController } from "../modules/vehicle/useCases/getVehicle/GetVehicleController"
import { InactivateVehicleController } from "../modules/vehicle/useCases/inactivateVehicle/inactivateVehicleController"
import { UpdateVehicleController } from "../modules/vehicle/useCases/updateVehicle/UpdateVehicleController"


const VehicleRoutes = Router()

const createVehicleController = new CreateVehicleController()
const getVehicleController = new GetVehicleController()
const inactivateVehicleController = new InactivateVehicleController()
// const inactivateRouteController = new InactivateRouteController()
const updateVehicleController = new UpdateVehicleController()

VehicleRoutes.use(esureAuthenticated)
VehicleRoutes.post('/', createVehicleController.handle)
VehicleRoutes.put('/:id', updateVehicleController.handle)
VehicleRoutes.get('/', getVehicleController.handle)
VehicleRoutes.delete('/', inactivateVehicleController.handle)

export { VehicleRoutes }