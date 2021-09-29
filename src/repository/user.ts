import {User} from '../entity/User';
import {getRepository} from 'typeorm';

const useRepository=getRepository(User);
export const SaveUser=async()=>{
const user =new User;
await useRepository.save(user);
}