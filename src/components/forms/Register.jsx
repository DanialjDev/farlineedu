import { Form, Formik } from 'formik';
import { withRouter } from 'react-router';
import { Input } from './Input';
import * as Yup from 'yup';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import { registerHandler } from '../../redux/features/userInfo';

const Register = ({ history }) => {
  const dispatch = useDispatch();

  const FormVariant = {
    hidden: {
      y: '-80vh',
      opacity: 1,
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
      y: '100vh',
      transition: {
        ease: 'easeInOut',
        duration: 5,
        type: 'spring',
      },
    },
  };

  const initialValues = {
    nationalCode: '',
    phoneNumber: '',
  };

  const validationSchema = Yup.object({
    nationalCode: Yup.string().required('پر کردن این فیلد الزامی است '),
    phoneNumber: Yup.string()
      .required('پر کردن این فیلد الزامی است')
      .matches(
        /^(\+98|0098|98|0)?9\d{9}$/g,
        'شماره مبایل وارد شده معتبر نمی باشد'
      ),
  });

  const onSubmit = (value) => {
    dispatch(registerHandler({ value, history }));
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
          // exit='exit'
        >
          <h1 className='header'>ثبت نام</h1>
          <Input type='text' name='nationalCode' placeholder='کد ملی' />
          <Input type='text' name='phoneNumber' placeholder='شماره موبایل' />
          <button className='submit' type='submit'>
            دریافت کد
          </button>
        </motion.div>
      </Form>
    </Formik>
  );
};

export default withRouter(Register);
