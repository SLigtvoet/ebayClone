import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import {User} from "../users/entity";
import {Ticket} from '../tickets/entity'

@Entity()
export default class Event extends BaseEntity{

    @PrimaryGeneratedColumn()
    id?: number

    @Column('text')
    title: string

    @Column('text')
    pictureUrl: string

    @Column('text')
    startDate: string

    @Column('text')
    startTime: string

    @ManyToOne(_ => User, user => user.events, {eager: true})
    user: User

    @OneToMany(_=> Ticket, ticket => ticket.event )
    ticket: Ticket[]

}

