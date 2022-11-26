interface ICreateExpenseDTO {
    description: string
    route: string,
    type: string
    value: Number,
    user: string
}


export { ICreateExpenseDTO }