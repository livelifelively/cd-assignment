import { apiRequestHandler } from '../../services/http';
import { UsersAPIConfigurations } from './users.configurations';

export const API_UsersAll = async (requestData: any) => {
  const res: any = await apiRequestHandler(requestData, UsersAPIConfigurations['USERS_ALL']);
  return res?.data;
};

export const API_UserDetails = async (requestData: any) => {
  const res: any = await apiRequestHandler(requestData, UsersAPIConfigurations['USER_DETAILS']);
  return res?.data;
};

export const API_UserPosts = async (requestData: any) => {
  const res: any = await apiRequestHandler(requestData, UsersAPIConfigurations['USER_POSTS']);
  return res?.data;
};
