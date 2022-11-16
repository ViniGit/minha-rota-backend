import { container } from "tsyringe"

import { IUsersRepository } from "../../modules/accounts/repositories/IUsersRepository"
import { UsersRepository } from "../../modules/accounts/repositories/implementations/UsersRepository"
import { IUsersTokenRepository } from "../../modules/accounts/repositories/IUsersTokensRepository"
import { UsersTokenRepository } from "../../modules/accounts/repositories/implementations/UsersTokenRepository"
import { IRouteRepository } from "../../modules/route/repositories/IRouteRepository"
import { RouteRepository } from "../../modules/route/repositories/implementations/RouteRepository"
import { IVehicleRepository } from "../../modules/vehicle/repositories/IVehicleRepository"
import { VehicleRepository } from "../../modules/vehicle/repositories/implementations/VehicleRepository"
import { IExpenseRepository } from "../../modules/expense/repositories/IExpenseRepository"
import { ExpenseRepository } from "../../modules/expense/repositories/implementations/ExpenseRepository"

container.registerSingleton<IUsersRepository>(
    "UsersRepository",
    UsersRepository
)

container.registerSingleton<IUsersTokenRepository>(
    "UsersTokenRepository",
    UsersTokenRepository
)

container.registerSingleton<IRouteRepository>(
    "RouteRepository",
    RouteRepository
)

container.registerSingleton<IVehicleRepository>(
    "VehicleRepository",
    VehicleRepository
)

container.registerSingleton<IExpenseRepository>(
    "ExpenseRepository",
    ExpenseRepository
)