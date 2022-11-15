interface ICreateVehicleDTO {
    plate: string
    type: string
    km_per_lt: Number,
    user: string
}

interface IUpdateVehicleDTO {
    plate: string
    type: string
    km_per_lt: Number,
    id: string
}

export { ICreateVehicleDTO, IUpdateVehicleDTO }