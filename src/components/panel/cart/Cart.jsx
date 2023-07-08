import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import {
   getTotalPriceHandler,
   getUserCartHandler,
} from '../../../redux/features/cart';
import CartContainer from './cart-container/CartContainer';
import './cart.css';

const Cart = () => {
   const dispatch = useDispatch();
   const { cart } = useSelector((state) => state.cart);

   const phoneNumber = localStorage.getItem('phoneNumber');

   useEffect(() => {
      dispatch(getUserCartHandler(phoneNumber));
      dispatch(getTotalPriceHandler(phoneNumber));
   }, []);

   const EmptyCart = () => (
      <div className='empty-cart'>
         <p>سبد خرید شما خالی است!</p>
      </div>
   );

   return (
      <div className='table-container'>
         {cart.length !== 0 ? <CartContainer /> : <EmptyCart />}
      </div>
   );
};

export default Cart;
