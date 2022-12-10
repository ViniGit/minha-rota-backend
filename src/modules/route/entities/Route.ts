import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm"

import { User } from "../../accounts/entities/User"

import { v4 as uuidV4 } from "uuid"
import { Travel } from "../../travel/entities/Travel"


@Entity("route")

class Route {

    @PrimaryColumn()
    id: string

    @Column()
    destination: string

    @Column()
    description: string

    @Column()
    user_id: string

    @ManyToOne(() => User)
    @JoinColumn({ name: "user_id" })
    user: User

    @OneToMany(() => Travel, (travel) => travel.route)
    travels: Travel[]

    @Column()
    distance: Number

    @Column()
    price: Number

    @Column('boolean', { default: false })
    inactive: boolean = false

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

export { Route }