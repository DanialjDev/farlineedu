import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { getDiscountHandler } from '../../../../redux/features/cart';
import CartItem from '../cart-item/CartItem';
import { GiTicket } from 'react-icons/gi';

const CartContainer = () => {
   const dispatch = useDispatch();
   const { cart, totalPrice, totalCount } = useSelector((state) => state.cart);
   const [disCountCode, setDisCountCode] = useState(null);
   const phoneNumber = localStorage.getItem('phoneNumber');
   return (
      <>
         <table>
            <tr className='title-table'>
               <th>دوره های انتخاب شده</th>
               <th>حذف دوره</th>
               <th>قیمت دوره</th>
            </tr>
            {cart.map((cartItem, index) => (
               <CartItem key={index} cartItem={cartItem} />
            ))}
         </table>
         <div className='total-price '>
            <div className='total-price-detail'>
               <div className='products-number panel-details'>
                  <span className='product-count'>تعداد محصول : </span>
                  <span className='product-count-value'>{totalCount}</span>
               </div>
               <div className='price-detail panel-details'>
                  <span className='product-price'>مبلغ کل :</span>
                  <span className='product-prict-value'>
                     {' '}
                     {totalPrice} تومان
                  </span>
               </div>
            </div>
            <div className='discount-code'>
               <input
                  className='discount-input'
                  type='text'
                  value={disCountCode}
                  placeholder='کد تخفیف خود را وارد کنید'
                  onChange={(e) => setDisCountCode(e.target.value)}
               />
               <div
                  className='discount'
                  onClick={() =>
                     dispatch(getDiscountHandler({ phoneNumber, disCountCode }))
                  }>
                  <GiTicket />
                  <button type='submit'>اعمال</button>
               </div>
            </div>
            <div className='checkout'>
               <button className='checkout-btn'>پرداخت</button>
            </div>
         </div>
      </>
   );
};

export default CartContainer;
