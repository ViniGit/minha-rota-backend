import { CategoriesRepository } from "../../repositories/implementations/CategoriesRepository";
import { ListCategoriesControllers } from "./ListCategoriesController";
import { ListCategoriesUseCase } from "./ListCAtegoriesUseCase";

const categoriesRepository = CategoriesRepository.getInstance()
const listCategoriesUseCase = new ListCategoriesUseCase(categoriesRepository)
const listCategoriesControllers = new ListCategoriesControllers(listCategoriesUseCase)

export { listCategoriesControllers }