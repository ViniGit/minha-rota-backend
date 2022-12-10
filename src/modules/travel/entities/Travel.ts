import { Column, CreateDateColumn, Entity, Generated, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm"

import { User } from "../../accounts/entities/User"

import { v4 as uuidV4 } from "uuid"
import { Route } from "../../route/entities/Route"
import { Vehicle } from "../../vehicle/entities/Vehicle"


@Entity("travel")

class Travel {

    @PrimaryColumn()
    id: string

    @Column()
    description: string

    @Column()
    user_id: string

    @Column()
    vehicle_id: string

    @Column()
    route_id: string

    @Column()
    travels: Number

    @ManyToOne(() => Route, (route) => route.travels)
    @JoinColumn({ name: "route_id" })
    route: Route

    @ManyToOne(() => Vehicle, (vehicle) => vehicle.vehicles)
    @JoinColumn({ name: "vehicle_id" })
    vehicle: Vehicle

    @ManyToOne(() => User)
    @JoinColumn({ name: "user_id" })
    user: User

    @Column('boolean', { default: false })
    inactive: boolean = false

    @Column()
    date: Date

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    constructor() {
        if (!this.id) {
            this.id = uuidV4()
        }
    }

}

export { Travel }