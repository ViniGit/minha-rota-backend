import { Column, CreateDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm'
import { v4 as uuidV4 } from 'uuid'

@Entity('users')
class User {
    @PrimaryColumn()
    id: string

    @Column()
    name: string

    @Column()
    email: string

    @Column()
    password: string

    @Column()
    cpf: string

    @Column()
    cell: string

    @Column()
    isAdmin: boolean

    @Column()
    birth_date: Date

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

export { User }