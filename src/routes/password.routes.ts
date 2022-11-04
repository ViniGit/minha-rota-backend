import { Router } from "express"
import { ResetPasswordUserController } from "../modules/accounts/useCases/resetPasswordUser/resetPasswordUserController"
import { SendForgotPasswordMailController } from "../modules/accounts/useCases/sendForgotPasswordMail/SendForgotPasswordMailController"


const passwordRoutes = Router()

const sendForgotPAsswordMailController = new SendForgotPasswordMailController()
const resetPasswordUserController = new ResetPasswordUserController()

passwordRoutes.post("/forgot", sendForgotPAsswordMailController.handle)
passwordRoutes.post("/reset", resetPasswordUserController.handle)

export { passwordRoutes }