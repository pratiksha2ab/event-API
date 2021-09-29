import { Entity,PrimaryGeneratedColumn,Column } from "typeorm";
 
@Entity()
export class Register{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    fullname:string;

    @Column()
    phone:string;

    @Column()
    email:string;
}