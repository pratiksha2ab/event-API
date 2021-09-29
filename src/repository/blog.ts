import {Blog} from '../entity/Blog';
import { getRepository } from 'typeorm';

const useRepository=getRepository(Blog);
export const SaveBlog=async()=>{
const blog =new Blog;
await useRepository.save(blog);
}