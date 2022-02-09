import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import { getCodeAgain } from '../../redux/features/userInfo';
import Toast from '../../toasts/toasts';

const GetCode = ({ history }) => {
  const dispatch = useDispatch();
  const phoneNumber = localStorage.getItem('phoneNumber');

  const code = useSelector((state) => state.userReducer.code);
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
  const goToChangePassword = () => {
    const input = document.querySelector('.input-code').value;
    console.log(input);
    console.log(code);
    if (input === code) {
      history.push('/change-password');
      console.log('ok');
    } else {
      Toast.toastError('کد وارد شده صحیح نمی بشد');
    }
  };

  return (
    <motion.div
      className='form'
      variants={FormVariant}
      initial='hidden'
      animate='visible'
      exit='exit'>
      <div className='form-container'>
        <div className='get-code-text'>
          کد ارسال شده به شماره {phoneNumber} را وارد کنید{' '}
        </div>
        <input className='input-code' type='text' />
        <button className='submit' type='submit' onClick={goToChangePassword}>
          تایید
        </button>
        <div className='resend'>
          <p className='resend-code-text'>کد فعال سازی را دریافت نکرده اید؟</p>
          <button
            className='resend-code-btn'
            onClick={() => dispatch(getCodeAgain(phoneNumber))}>
            <div className='resend-text'>ارسال مجدد</div>
            <span class='lnr lnr-undo'></span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default withRouter(GetCode);
