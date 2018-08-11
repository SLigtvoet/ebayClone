import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsString, MinLength, IsEmail, IsMobilePhone, IsBoolean } from 'class-validator';


@Entity()
export default class Users extends BaseEntity{

    @PrimaryGeneratedColumn()
    id?: number

    @IsString()
    @MinLength(2)
    @Column('text', {nullable:false})
    firstName: string

    @IsString()
    @MinLength(2)
    @Column('text', {nullable:false})
    lastName: string

    @IsEmail()
    @Column('text', {nullable:false})
    email: string

    @IsMobilePhone('en-NL')
    @Column('text', {nullable:false})
    telephoneNumber: string

    @IsString()
    @MinLength(2)
    @Column('text', {nullable:false})
    city: string

    @IsBoolean()
    @Column('text')
    isAdmin: boolean

    @Column('text', {nullable:true})
    adds: number[]

}