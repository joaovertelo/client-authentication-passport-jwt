import axios from 'axios';
import { AUTH_USER, AUTH_ERROR } from './types';

export const signup = (formProps, callback)=> async dispathc => {
    try {
      const response = await axios.post('http://localhost:3090/signup', formProps);

      dispathc({type: AUTH_USER, payload: response.data.token});
      localStorage.setItem('token', response.data.token);
      callback();
    } catch (e){
        dispathc({ type: AUTH_ERROR, payload: 'E-mail em uso'});
    }

};

export const signout = () => {
  localStorage.removeItem('token');

  return {
      type: AUTH_USER,
      payload: ''
  }
};

export const signin = (formProps, callback) => async dispathc => {
  try {
    const response = await axios.post('http://localhost:3090/signin', formProps);

    dispathc({type: AUTH_USER, payload: response.data.token});
    localStorage.setItem('token', response.data.token);
    callback();
  } catch (e){
    dispathc({ type: AUTH_ERROR, payload: 'Invalid login credentials'});
  }
}