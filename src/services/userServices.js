import config from './config.json';
import http from './httpService';
import Cookies from 'js-cookie';

export const userRegister = (user) => {
   return http.post(`${config.baseUrl}/api/user/create/`, JSON.stringify(user));
};

export const fillProfile = (user) => {
   const phoneNumber = localStorage.getItem('phoneNumber');
   console.log(phoneNumber, user);
   return http.post(
      `${config.baseUrl}/api/user/update/${phoneNumber}/`,
      JSON.stringify(user)
   );
};

export const getCsrtToken = () => {
   return http.get(`${config.baseUrl}/api/csrf/`);
};

export const userLogin = (data) => {
   const user = {
      username: data.phoneNumber,
      password: data.password,
   };
   console.log(Cookies.get('csrftoken'));
   return http.post(`${config.baseUrl}/api/login/`, JSON.stringify(user), {
      headers: {
         'X-CSRFTOKEN': Cookies.get('csrftoken'),
      },
   });
};

export const resendCode = (phoneNumber) => {
   // const phoneNumber = localStorage.getItem('phoneNumber');
   return http.post(`${config.baseUrl}/api/user/code/again/${phoneNumber}/`);
};

export const forgotPassword = (phoneNumber) => {
   return http.post(
      `${config.baseUrl}/api/user/change/password/${phoneNumber}/`
   );
};

export const getAllUserData = () => {
   const phoneNumber = localStorage.getItem('phoneNumber');
   return http.get(`${config.baseUrl}/api/user/info/${phoneNumber}/`);
};

export const changePassword = (phoneNumber, password) => {
   const validationCode = process.env.REACT_APP_VALIDATION_CODE;
   console.log(validationCode);

   return http.post(
      `${config.baseUrl}/api/user/change/password/${phoneNumber}/`,
      JSON.stringify({ password, danial: validationCode })
   );
};

export const logout = () => {
   console.log(Cookies.get('csrftoken'));
   return http.get(`${config.baseUrl}/api/logout/`, {
      headers: Cookies.get('csrftoken'),
   });
};

export const changePasswordFromPanel = (value) => {
   const VALIDATION_CODE = process.env.REACT_APP_VALIDATION_CODE;
   console.log(VALIDATION_CODE);
   const { oldPassword, password } = value.value;
   const phoneNumber = localStorage.getItem('phoneNumber');
   return http.post(
      `${config.baseUrl}/api/user/change/password/${phoneNumber}/`,
      JSON.stringify({ old_password: oldPassword, password, VALIDATION_CODE })
   );

   // old_password, password, VALIDATION_CODE
};

export const getTeachers = () => {
   return http.get(`${config.baseUrl}/api/teachers/`);
};

export const getGuide = (value) => {
   return http.post(`${config.baseUrl}/api/giude/`, JSON.stringify(value));
};

export const getCoursesKinds = () => {
   return http.get(`${config.baseUrl}/api/kinds/`);
};

export const getCovers = () => {
   return http.get(`${config.baseUrl}/api/covers/`);
};
