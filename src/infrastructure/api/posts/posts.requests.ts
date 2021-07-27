import { apiRequestHandler } from '../../services/http';
import { PostsAPIConfigurations } from './posts.configurations';

export const API_PostByUserId = async (requestData: any) => {
  const res: any = await apiRequestHandler(requestData, PostsAPIConfigurations['POST_BY_USER_ID']);
  return res?.data;
};
