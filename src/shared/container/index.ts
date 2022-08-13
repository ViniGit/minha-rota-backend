import { container } from "tsyringe"

import { IUsersRepository } from "../../modules/accounts/repositories/IUsersRepository"
import { UsersRepository } from "../../modules/accounts/repositories/implementations/UsersRepository"
import { IUsersTokenRepository } from "../../modules/accounts/repositories/IUsersTokensRepository"
import { UsersTokenRepository } from "../../modules/accounts/repositories/implementations/UsersTokenRepository"

container.registerSingleton<IUsersRepository>(
    "UsersRepository",
    UsersRepository
)

container.registerSingleton<IUsersTokenRepository>(
    "UsersTokenRepository",
    UsersTokenRepository
)