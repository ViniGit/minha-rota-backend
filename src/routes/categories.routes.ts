import { Router } from 'express'
import multer from "multer"

import { createCategoryController } from '../modules/cars/useCases/createCategory'
import { listCategoriesControllers } from '../modules/cars/useCases/listCategories'
import { importCategoryController } from '../modules/cars/useCases/importCategory'

const categoriesRoutes = Router()

const upload = multer({
    dest: "./tmp",
})

categoriesRoutes.post("/", (request, response) => {
    console.log("Reload funcionando")
    return createCategoryController.handle(request, response)
})

categoriesRoutes.get("/", (request, response) => {
    return listCategoriesControllers.handle(request, response)
})

categoriesRoutes.post("/import", upload.single("file"), (request, response) => {
    return importCategoryController.handle(request, response)
})


export { categoriesRoutes }