import * as bcrypt from 'bcrypt'
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { Exclude } from 'class-transformer'
import Event from '../events/entity';
import {Ticket} from '../tickets/entity'
import Comment from '../comments/entity'

@Entity()
export class User extends BaseEntity{

    async setPassword(rawPassword: string) {
        const hash = await bcrypt.hash(rawPassword, 10)
        this.password = hash
        }
    
        checkPassword(rawPassword: string): Promise<boolean> {
        return bcrypt.compare(rawPassword, this.password)
        }

    @PrimaryGeneratedColumn()
    id?: number

    @Column('text', {nullable:false})
    firstName: string

    @Column('text', {nullable:false})
    lastName: string

    @Column('text', {nullable:false})
    email: string

    @Column('text', {nullable:false})
    telephoneNumber: string

    @Column('text', { nullable:true })
    @Exclude({toPlainOnly:true})
    password: string

    @Column({default: 0})
    ticketCounter: number

    @OneToMany(_ => Event, event => event.user)
    events: Event[]
  
    @OneToMany(_ => Ticket, ticket => ticket.user)
    ticket: Ticket[]

    @OneToMany(_ => Comment, comment => comment.user)
    comments: Comment[]

}