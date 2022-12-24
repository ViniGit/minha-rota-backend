import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm"

import { User } from "../../accounts/entities/User"

import { v4 as uuidV4 } from "uuid"
import { Route } from "../../route/entities/Route"


@Entity("expense")

class Expense {

    @PrimaryColumn()
    id: string

    @Column()
    description: string

    @Column()
    user_id: string

    @Column()
    route_id: string

    @ManyToOne(() => Route)
    @JoinColumn({ name: "route_id" })
    route: Route

    @ManyToOne(() => User)
    @JoinColumn({ name: "user_id" })
    user: User

    @Column()
    type: string

    @Column()
    value: Number

    @Column('boolean', { default: false })
    inactive: boolean = false

    @CreateDateColumn()
    created_at: Date = new Date()

    @UpdateDateColumn()
    updated_at: Date = new Date()

    constructor() {
        if (!this.id) {
            this.id = uuidV4()
        }
    }

}

export { Expense }