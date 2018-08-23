import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, OneToMany} from "typeorm";
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import Event from '../events/entity'
import {User} from "../users/entity";
import Comment from '../comments/entity'

@Entity()
export class Ticket extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column({nullable:true})
  price: number

  @Column('text',{nullable:true})
  description: string

  @Column('text',{nullable:true})
  thumbnail: string

  @CreateDateColumn({type: 'timestamp'})
  timeOfCreation: Date 

  @Column({default: 0})
  commentsCounter: number

  @ManyToOne(_ => User, user => user.ticket, {eager: true})
  user: User

  @ManyToOne(_=> Event, event => event.ticket, {eager: true})
  event: Event

  @OneToMany(_=> Comment, comment => comment.ticket)
  comments: Comment[]
}