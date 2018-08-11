import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { BaseEntity } from 'typeorm/repository/BaseEntity'

@Entity()
export default class Adds extends BaseEntity{

    @PrimaryGeneratedColumn()
    id?: number

    @Column('text')
    title: string

    @Column('text')
    price: number

    @Column('text')
    pictureUrl: string

    @Column('text')
    addInfo: string

    @Column('text', {nullable:true})
    userId: number

    @Column('text', {nullable:true})
    email: string

    @Column('text', {nullable:true})
    telephoneNumber: number

}

