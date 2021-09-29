import { Entity,PrimaryGeneratedColumn,Column, Binary } from "typeorm";
@Entity()
export class Event {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    eventTitle:string;

    @Column()
    eventType:string;

    @Column()
    venueName:string;

    @Column()
    Address:string;

    @Column()
    eventSummary:string;

    @Column()
    eventDescription:string;


    @Column()
    startDate:string;

    @Column()
    endDate:string;

    @Column()
    organizationName:string;

    @Column()
    organizationEmail:string;

    @Column()
    Banner:string;

    @Column({default:false})
    
    isApproved:boolean;






   

   

 

   

 

  

}