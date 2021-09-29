import {Event} from '../entity/Event';
import { getRepository } from 'typeorm';

const useRepository=getRepository(Event);
export const SaveEvent=async()=>{
const event =new Event;
await useRepository.save(event);
}