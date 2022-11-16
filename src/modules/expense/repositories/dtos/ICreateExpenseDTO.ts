interface ICreateExpenseDTO {
    description: string
    type: string
    value: Number,
    user: string
}

interface IUpdateExpenseDTO {
    description: string
    type: string
    value: Number,
    id: string
}

export { ICreateExpenseDTO, IUpdateExpenseDTO }