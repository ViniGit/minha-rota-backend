import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from "typeorm"

import { User } from "../../accounts/entities/User"

import { v4 as uuidV4 } from "uuid"


@Entity("vehicle")

class Vehicle {

    @PrimaryColumn()
    id: string

    @Column()
    plate: string

    @Column()
    user_id: string

    @ManyToOne(() => User)
    @JoinColumn({ name: "user_id" })
    user: User

    @Column()
    type: string

    @Column()
    km_per_lt: Number

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

export { Vehicle }