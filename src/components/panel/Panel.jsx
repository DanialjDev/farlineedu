import React from 'react';
import { useSelector } from 'react-redux';
import PanelNav from './panel-nav/PanelNav';
import { Outlet, useLocation, useNavigate } from 'react-router';
import logo from '../../assets/logo__1_-removebg-preview.png';
import { CgMenu } from 'react-icons/cg';

import './panel.css';
import { Link } from 'react-router-dom';

const Panel = () => {
   const navigate = useNavigate();
   const { pathname } = useLocation();
   const { firstName, lastName } = useSelector((state) => state.user.userInfo);

   if (pathname === '/profile') navigate('/profile/dashbord');

   const toggleMenu = () => {
      const main = document.querySelector('.panel-main');
      const menu = document.querySelector('.panel-nav');
      menu.classList.toggle('active');
      main.classList.toggle('active');
   };

   return (
      <div className='panel-contain'>
         <PanelNav />
         <div className='panel-main'>
            <div className='panel-bar'>
               <div className='left-bar'>
                  {firstName && lastName ? (
                     <div className='panel-user'>
                        <div className='panel-username'>{`${firstName} ${lastName}`}</div>
                     </div>
                  ) : null}
                  <Link to='/' className='panel-logo'>
                     <img src={logo} alt='' />
                  </Link>
               </div>
               <div className='Hmenu' onClick={toggleMenu}>
                  <CgMenu />
               </div>
            </div>
            <div className='panel-table'>
               <Outlet />
            </div>
         </div>
      </div>
   );
};

export default Panel;
