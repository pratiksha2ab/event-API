import { Entity,PrimaryGeneratedColumn,Column } from "typeorm";

@Entity()
export class Blog{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    blogTitle:string;

    @Column()
    date:string;

    @Column()
    description:string;
    
    @Column()
    writerName:string;
}