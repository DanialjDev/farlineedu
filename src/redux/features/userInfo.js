import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Toasts from '../../toasts/toasts';
import Cookies from 'js-cookie';
import {
   resendCode,
   userRegister,
   fillProfile,
   getAllUserData,
   changePassword,
   userLogin,
   logout,
   changePasswordFromPanel,
   getCsrtToken,
} from '../../services/userServices';

export const getCodeAgain = createAsyncThunk('users/resend-code', async () => {
   try {
      const { data } = await resendCode();
      return Promise.resolve(data);
   } catch (err) {
      if (err.response) {
         console.log(err.response);
      }
      if (err.request) {
         console.log(err.request);
      }
      if (err.massage) {
         console.log(err.massage);
      }
   }
});

export const registerHandler = createAsyncThunk(
   'user/register',
   async (arg) => {
      const { navigate, value } = arg;
      const { phoneNumber } = value;
      try {
         const { data, status } = await userRegister(value);
         const { code } = data;
         if (status === 201) {
            localStorage.setItem('phoneNumber', phoneNumber);
            navigate('/get-code');
            return {
               value,
               code,
            };
         }
      } catch (e) {
         if (e.response) {
            if (e.response.status === 400) {
               Toasts.toastWarning('کاربر با این مشخصات موجود است');
            }
            return Promise.reject(e.response);
         }
      }
   }
);

export const getCsrfTokenHandler = createAsyncThunk(
   'get-csrftoken',
   async () => {
      try {
         const { data, status } = await getCsrtToken();
         if (status === 200) {
            return Promise.resolve(data);
         }
      } catch (er) {
         console.log(er);
      }
   }
);

export const loginHandler = createAsyncThunk('user/login', async (arg) => {
   console.log(arg);
   const { value, navigate } = arg;
   const { phoneNumber } = value;
   try {
      const { status } = await userLogin(value);
      if (status === 200) {
         Toasts.toastSuccess('login was successful');
         localStorage.setItem('phoneNumber', phoneNumber);
         navigate('/');
         window.location.reload();
      }
   } catch (e) {
      console.log(e);
      if (e.response) {
         console.log(e.response);
      }
   }
});

export const changePasswordFromPanelHandler = createAsyncThunk(
   'user/changePass',
   async (arg) => {
      try {
         // const { data, status } = await changePasswordFromPanel(arg);
         console.log(arg);
      } catch (e) {
         if (e.response) {
            console.log(e.response);
         }
      }
   }
);

export const logoutHandler = createAsyncThunk(
   'user/logout',
   async (navigate) => {
      try {
         const { status } = await logout();
         //  if (status === 200) {
         navigate('/', { replace: true });
         window.location.reload();
         localStorage.removeItem('phoneNumber');
         Cookies.remove('sessionid');
         //  }
         return Promise.resolve(navigate);
      } catch (err) {
         if (err.response) {
            console.log(err.response);
         }
      }
   }
);

export const fillProfileHandler = createAsyncThunk(
   'user/fill-profile',
   async (arg, { getState }) => {
      const state = getState();
      const VALIDATION_CODE = process.env.REACT_APP_VALIDATION_CODE;
      const { firstName, lastName, password, grade } = arg.value;
      const { navigate } = arg;
      const { nationalCode } = state.userReducer.userInfo;
      const phoneNumber = localStorage.getItem('phoneNumber');
      const user = {
         firstName,
         lastName,
         password,
         grade,
         phoneNumber,
         nationalCode,
         VALIDATION_CODE,
      };

      try {
         const { status } = await fillProfile(user);
         if (status === 200) {
            navigate('/');
            window.location.reload();
            Toasts.toastSuccess(' ثبت نام موفقیت آمیز بود ');
            return Promise.resolve(user);
         }
      } catch (e) {
         if (e.response) {
            console.log(e.response);
         }
      }
   }
);

export const forgotPasswordHandler = createAsyncThunk(
   'user/forgot-password',
   async (arg) => {
      const { navigate, phoneNumber } = arg;
      try {
         const { data, status } = await resendCode(phoneNumber);
         const { code } = data;

         if (status === 201) {
            navigate('/enter-code');
            localStorage.setItem('phoneNumber', phoneNumber);
            const { data, status } = await getAllUserData(phoneNumber);
            if (status === 200) {
               return {
                  data,
                  code,
               };
            }
         }
      } catch (err) {
         if (err.response) {
            console.log(err.response);
         }
      }
   }
);

export const changePasswordHandler = createAsyncThunk(
   'user/change-password',
   async (arg) => {
      const { phoneNumber, password, navigate } = arg;
      try {
         const { status } = await changePassword(phoneNumber, password);
         if (status === 200) {
            navigate('/');
            Toasts.toastSuccess('رمز عبور با موفقیت تغییر یافت');
         }
      } catch (err) {
         if (err.response) {
            console.log(err.response);
         }
      }
   }
);

export const getAllUsers = createAsyncThunk('user/get-user', async () => {
   try {
      const { data, status } = await getAllUserData();
      if (status === 200) {
         return Promise.resolve(data);
      }
   } catch (err) {
      if (err.response) {
         console.log(err.response);
      }
   }
});

// initial state
const initialState = {
   userInfo: {},
   code: '',
   isCodeValid: false,
};

const userReducer = createSlice({
   name: 'user',
   initialState: initialState,
   reducers: {
      checkUseOnceCode: (state, action) => {
         if (action.payload.values.code === action.payload.code) {
            state.isCodeValid = true;
         }
      },
   },
   extraReducers: {
      [getCodeAgain.fulfilled]: (state, action) => {
         state.code = action.payload.code;
      },

      [fillProfileHandler.fulfilled]: (state, action) => {
         Object.assign(state.userInfo, action.meta.arg.value);
         state.isLogedIn = true;
      },
      [registerHandler.fulfilled]: (state, action) => {
         Object.assign(state.userInfo, action.payload.value);
         state.code = action.payload.code;
      },
      [forgotPasswordHandler.fulfilled]: (state, action) => {
         const { data, code } = action.payload;
         Object.assign(state.userInfo, data);
         state.code = code;
      },
      [getAllUsers.fulfilled]: (state, action) => {
         Object.assign(state.userInfo, action.payload);
      },
      [logoutHandler.fulfilled]: () => {
         localStorage.removeItem('phoneNumber');
         window.location.href = '/';
      },
   },
});

export const { checkUseOnceCode } = userReducer.actions;

export default userReducer.reducer;
