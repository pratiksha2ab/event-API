import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Register {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullname: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  userId: string;

  @Column()
  eventId: string;

  @Column()
  eventTitle: string;

  @Column()
  imageUrl: string;

  
  @Column()
  type:string;
}
