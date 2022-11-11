interface ICreateRouteDTO {
    destination: string
    distance: Number
    price: Number,
    user: string
}

interface IUpdateRouteDTO {
    destination: string
    distance: Number
    price: Number,
    id: string
}

export { ICreateRouteDTO, IUpdateRouteDTO }