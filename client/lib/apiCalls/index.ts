import axios from 'axios';

import { port } from '../../port';

const api = axios.create({
  baseURL: port,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const register_me = async (formData : any) => {
  try {
      const response = await api.post('/api/users/register', formData);
      return response.data;
  } catch (error) {
      console.error('Error in register (service) => ', error);
      throw error; 
  }
};

export const login_me = async (formData : any) => {
  try {
    // console.log("form",formData);
    
    const response = await axios.post(`${port}/api/users/login`, formData);
    // console.log("res",response.data);
    
    return response.data;
  } catch (error) {
    console.log('error in login (service) => ', error);
  }
};

export const getUserData = async (userId : Number, token : string) => {
  try {
    const response = await api.get(`api/users/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
};

export const updateUserData = async (userId : Number, authToken : String, userData:any) => {
  try {
    // console.log("updateUserData55",userId,authToken,userData);
    const response = await axios.put(`${port}/api/users/${userId}`, userData,
      {
        headers: {
          Authorization: `Bearer ${authToken}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  } catch (error) {
    throw error;
  }
}

export default api;



