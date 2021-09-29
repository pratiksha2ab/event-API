import "reflect-metadata";
import {createConnection, In} from "typeorm";
import {User} from "./entity/User";
import * as express from "express";
import * as cors from 'cors';
import {Event} from './entity/Event'; 
import {Contact} from './entity/Contact';
import { Blog } from "./entity/Blog";
import {MailSender} from '../utils/email';

import { Register } from "./entity/Register";
var cloudinary =require("cloudinary").v2;
require('dotenv').config();
const fileUpload=require('express-fileupload');


createConnection().then(async connection => {
    const app=express();
    app.use(express.json());
    app.use(cors());
    app.use(fileUpload({
        useTempFiles : true,
        tempFileDir : './tmp/'

    }))
    cloudinary.config({
        cloud_name:process.env.CLOUDINARY_NAME,
        api_key:process.env.CLOUDINARY_KEY_API,
        api_secret:process.env.CLOUDINARY_SECRET_KEY
    })
    const userRepository=connection.getRepository(User);
    app.post("/user",(req,res)=>{
        const user= userRepository.create(req.body);
        const userResponse=userRepository.save(user);
        
        return res.send(userResponse);
    })
    const eventRepository=connection.getRepository(Event);
    app.post("/event",async(req,res)=>{
        if(req.files){

        
         await cloudinary.uploader.upload(req.files.Banner.tempFilePath,{resource:'image'},(error,result)=>{
        console.log(error,result);
        req.body.Banner=result.url;
         })
        }
        console.log(req.body.Banner);
        const event=eventRepository.create(req.body);


         eventRepository.save(event);
         MailSender(req.body.organizationEmail,1)

        return res.send({"message":"event saved successfully"});
        })
    // //     console.log(req.body.image);
    // //     const event=eventRepository.create(req.body);


    // //     await eventRepository.save(event);
    // //     return res.send({"message":"event saved successfully"});
    // // })
    // // app.get("/event",async(req,res)=>{
    // //     const data=await eventRepository.findAndCount();
    // //     console.log(data);
    // //     return res.send(data);
        
    // // })
   
    app.put("/event/:id",async(req,res)=>{
        try {
            const event=await eventRepository.findOne(req.params.id);
            eventRepository.merge(event,req.body);
            await eventRepository.save(event);
            return res.send({"message":"event updated succesfully"});
            
        } catch (error) {
            console.log(error);
            return res.status(500).send({"message":"user not found"});
        }
        


    })
    app.delete("/event/:id",async(req,res)=>{
        try {
            await eventRepository.findOne(req.params.id);
            await eventRepository.delete(req.params.id);
            return res.send({"message":"deleted successfully"})
            
        } catch (error) {
            return res.status(500).send({"message":"user not found"});
        }
    })

    // // const eventRepository=connection.getRepository(Event);
    // // app.post("/event",async(req,res)=>{
    // //     const event= eventRepository.create(req.body);
    // //     await eventRepository.save(event)
    // //     return res.send({"message":"event details send"});
    // // })

    app.get("/event",async(req,res)=>{
        const userResponse=await getEventByEventType(req.query.id)
        console.log(userResponse)
        return  res.send (userResponse);
            
        })

        app.get("/admin/event",async(req,res)=>{
            const userResponse=await eventRepository.find()
            console.log(userResponse)
            return  res.send (userResponse);
                
            })

        



    const contactRepository=connection.getRepository(Contact);
    app.post("/contact",async(req,res)=>{
        const contact= contactRepository.create(req.body);
        await contactRepository.save(contact);
        MailSender(req.body.email,2)

        return res.send({"message":"contact details send "});
    })
    app.get("/contact",async(req,res)=>{
        const data=await contactRepository.findAndCount();
        console.log(data);
        return res.send(data);
        
    })

    const getEventByEventType=async(id)=>{
        
      
            const response=await eventRepository.find({
                where: {
                    isApproved:In([true]),
                }
            });
            return response
        
        
        }

        const getEventByLocation=async()=>{
            const response=await eventRepository.find({
                where:{
                    Address:""
                }
            })
        }

        const blogRepository=connection.getRepository(Blog);
        app.post("/blog",async(req,res)=>{
            const blog= blogRepository.create(req.body);
            await blogRepository.save(blog)
            return res.send({"message":"blog saved"});
        })

        app.get("/blog",async(req,res)=>{
            const userResponse=await blogRepository.find()
            console.log(userResponse)
            return  res.send (userResponse);
                
            })

        app.get("/event/:id",async(req,res)=>{
            try {const data =await eventRepository.findOne(req.params.id);
                return await res.send(data);

                
                
            } catch (error) {
                console.log(error);
                return res.status(500).send({"message":"user not found"});
            }
            
        })

        app.get("/blog/:id",async(req,res)=>{
            try {const data =await blogRepository.findOne(req.params.id);
                return await res.send(data);

                
                
            } catch (error) {
                console.log(error);
                return res.status(500).send({"message":"user not found"});
            }
            
        })
       
        const registerRepository=connection.getRepository(Register);
        app.post("/register",async(req,res)=>{
            const register= registerRepository.create(req.body);
            await registerRepository.save(register);
            return res.send({"message":"event have been registered "});
        })

        app.get("/register",async(req,res)=>{
            const data=await registerRepository.findAndCount();
            console.log(data);
            return res.send(data);
            
        })

    
    
    
    app.listen(5001)
    console.log("api is running at 5001 port")

})
