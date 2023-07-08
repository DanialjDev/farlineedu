import { useEffect } from 'react';
import img from '../../assets/404.png';

import './404.css';

function PageNotFound() {
   // hide navbar
   useEffect(() => {
      document.querySelector('nav').style.display = 'none';
      return () => {
         document.querySelector('nav').style.display = 'flex';
      };
   });

   return (
      <div className='page-not-found-container'>
         <div className='not-found-img'>
            <img src={img} alt='' />
         </div>
         <div className='not-found-text'>صفحه مورد نظر پیدا نشد</div>
      </div>
   );
}

export default PageNotFound;
