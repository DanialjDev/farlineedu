import { Form, Formik } from 'formik';
import { motion } from 'framer-motion';
import { withRouter } from 'react-router';
import { Input } from './Input';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { fillProfile } from '../../services/userServices';
import { toast } from 'react-toastify';
import { completePrfileHandler } from '../../redux/features/userInfo';

import './form.css';
const CompleteProfile = ({ history }) => {
  const dispatch = useDispatch();
  const userRegisterInfo = useSelector((state) => state.userReducer.userInfo);
  console.log(userRegisterInfo);

  const FormVariant = {
    hidden: {
      y: '-50vh',
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        delay: 0.3,
        type: 'spring',
        stiffness: 100,
      },
    },
    exit: {
      y: '120vh',
      opacity: 0,
      transition: {
        ease: 'easeInOut',
        delay: 0.5,
      },
    },
  };

  const options = ['دهم', 'یازدهم', 'دوازدهم'];

  const grades = options.map((option) => (
    <option value={option}>{option}</option>
  ));

  const initialValues = {
    firstName: '',
    lastName: '',
    grade: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required('پرکردن این فیلد الزامی است'),
    lastName: Yup.string().required('پرکردن این فیلد الزامی است'),
    grade: Yup.string()
      .required('انتخاب پایه تحصیلی الزامی است')
      .oneOf(options),
    password: Yup.string()
      .required('پرکردن این فیلد الزامی است')
      .min(8, 'گذرواژه نمی تواند کمتر از 8 کارکتر باشد'),
    confirmPassword: Yup.string()
      .required('پرکردن این فیلد الزامی است')
      .oneOf([Yup.ref('password'), ''], 'پسوورد ها با هم برابر نیستند'),
  });

  const onSubmit = async (value) => {
    const danial = 'fdgfdhj67867sdfsf2343nh';
    const { firstName, lastName, password, grade } = value;
    const { phoneNumber, nationalCode } = userRegisterInfo;
    const user = {
      firstName,
      lastName,
      password,
      grade,
      phoneNumber,
      nationalCode,
      danial,
    };
    try {
      const { status } = await fillProfile(user, phoneNumber);
      if (status === 200) {
        console.log('ok');
        dispatch(completePrfileHandler({ value: user }));
        history.push('/');
        toast.success(' ثبت نام موفقیت آمیز بود ', {
          position: 'top-right',
          closeOnClick: true,
        });
      }
    } catch (e) {
      if (e.response) {
        console.log(e.response);
      } else if (e.message) {
        console.log(e.message);
      } else if (e.request) {
        console.log(e.request);
      }
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}>
      <Form className='form'>
        <motion.div
          className='form-container'
          variants={FormVariant}
          initial='hidden'
          animate='visible'
          exit='exit'>
          <h1 className='header'>تکمیل اطلاعات</h1>
          <Input type='text' name='firstName' placeholder='نام' />
          <Input type='text' name='lastName' placeholder='نام خانوادگی' />
          <Input
            type='select'
            name='grade'
            id='grade'
            placeholder='پایه تحصیلی'
            grades={grades}
            className='grade'
          />
          <Input type='password' name='password' placeholder='رمز عبور' />
          <Input
            type='password'
            name='confirmPassword'
            placeholder='تکرار رمز عبور'
          />
          <button className='submit' type='submit'>
            ثبت اطلاعات
          </button>
        </motion.div>
      </Form>
    </Formik>
  );
};

export default withRouter(CompleteProfile);
