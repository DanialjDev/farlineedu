import { Link } from 'react-router-dom';
import { BsGeoFill, BsTelephone } from 'react-icons/bs';
import './footer.css';
export const Footer = () => {
   return (
      <footer>
         <section className='footer-main'>
            <div className='footer-right'>
               <div className='footer-container'>
                  <div className='address-boy detail'>
                     <BsGeoFill />
                     <p>
                        میدان 9 دی ، جنب سرای محله عباسی ،ابتدای خیابان شیخ
                        محمدی شرقی ، کوچه مدرسه ، کوچه احدی ، دبیرستان غیردولتی
                        طوس (دوره دوم) ، ویژه پسران
                     </p>
                  </div>
                  <div className='tel-boy detail'>
                     <BsTelephone />
                     <p>021-55674354</p>
                  </div>

                  <div className='address-girl detail'>
                     <BsGeoFill />

                     <p>
                        خیابان قلعه مرغی ، میدان شهدای مدافع حرم ، ابتدای نواب
                        جنوب به شمال ، خیابان شیخ محمدی شرقی ، کوچه مدرسه ،
                        آموزشگاه حمیدان ، ویژه دختران
                     </p>
                  </div>
                  <div className='tel-girl detail'>
                     <BsTelephone />

                     <p>021-91301962</p>
                  </div>
               </div>
               <div className='footer-items'>
                  <ul>
                     <li>
                        <Link to='/teachers'> اساتید فرلاین</Link>
                     </li>
                     <li>
                        <Link to='/study-map'>نقشه راه</Link>
                     </li>
                     <li>
                        <Link to='/about-us'>درباره ما</Link>
                     </li>
                     <li>
                        <Link to='/usual-questions'>سوالات متداول</Link>
                     </li>
                     <li>
                        <Link to='/provisions'>قوانین سایت</Link>
                     </li>
                  </ul>
               </div>
            </div>
            <div className='footer-left'>
               <div className='location'>
                  <div className='location-boy'>
                     <a
                        href='https://maps.app.goo.gl/fXg2t6trMPWHdd966'
                        target='_blank'
                        rel='noreferrer'>
                        <img src='images/toos.jpg' alt='fartak-location' />
                     </a>
                  </div>
               </div>
            </div>
         </section>
      </footer>
   );
};
