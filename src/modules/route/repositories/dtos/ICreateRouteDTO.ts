interface ICreateRouteDTO {
    destination: string
    description: string
    distance: Number
    price: Number,
    user: string
}

interface IUpdateRouteDTO {
    destination: string
    description: string
    distance: Number
    price: Number,
    id: string
}

export { ICreateRouteDTO, IUpdateRouteDTO }