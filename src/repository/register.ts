import { Register } from '../entity/Register';
import { getRepository } from 'typeorm';

const useRepository=getRepository(Register);
export const SaveContact=async()=>{
const register =new Register;
await useRepository.save(register);
}