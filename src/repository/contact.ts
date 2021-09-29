import {Contact} from '../entity/Contact';
import { getRepository } from 'typeorm';

const useRepository=getRepository(Contact);
export const SaveContact=async()=>{
const contact =new Contact;
await useRepository.save(contact);
}