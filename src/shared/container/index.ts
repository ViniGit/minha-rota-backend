import { container } from "tsyringe"

import { IUsersRepository } from "../../modules/accounts/repositories/IUsersRepository"
import { UsersRepository } from "../../modules/accounts/repositories/implementations/UsersRepository"
import { IUsersTokenRepository } from "../../modules/accounts/repositories/IUsersTokensRepository"
import { UsersTokenRepository } from "../../modules/accounts/repositories/implementations/UsersTokenRepository"
import { IRouteRepository } from "../../modules/route/repositories/IRouteRepository"
import { RouteRepository } from "../../modules/route/repositories/implementations/RouteRepository"

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