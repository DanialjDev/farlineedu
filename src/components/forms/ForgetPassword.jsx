import { Form, Formik } from 'formik';
import { motion } from 'framer-motion';
import * as Yup from 'yup';
import { Input } from './Input';
import { useDispatch } from 'react-redux';
import { forgotPasswordHandler } from '../../redux/features/userInfo';
import { withRouter } from 'react-router';

import './form.css';
const ForgetPassword = ({ history }) => {
  const dispatch = useDispatch();

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
        duration: 1,
        type: 'spring',
        stiffness: 100,
      },
    },
    exit: {
      y: 100,
      opacity: 0.7,
      transition: {
        ease: 'easeInOut',
        delay: 5,
      },
    },
  };

  const initialValues = {
    phoneNumber: '',
  };

  const validationSchema = Yup.object({
    phoneNumber: Yup.string()
      .required('پر کردن این فیلد الزامی است')
      .matches(
        /^(\+98|0098|98|0)?9\d{9}$/g,
        'شماره مبایل وارد شده معتبر نمی باشد'
      ),
  });

  const onSubmit = (values) => {
    const { phoneNumber } = values;
    console.log(phoneNumber);
    dispatch(forgotPasswordHandler({ phoneNumber, history }));
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
          <h1 className='header'>لطفا شماره موبایل خود را وارد کنید</h1>
          <Input
            id='phonenumber'
            type='tel'
            name='phoneNumber'
            placeholder='شماره مبایل'
          />
          <button className='submit' type='submit'>
            دریافت کد
          </button>
        </motion.div>
      </Form>
    </Formik>
  );
};

export default withRouter(ForgetPassword);
