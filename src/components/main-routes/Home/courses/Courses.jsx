import { Fragment, useEffect } from 'react';
import SwiperCore, { Pagination, Navigation } from 'swiper';
import { useDispatch, useSelector } from 'react-redux';
import { coursesKinds } from '../../../../redux/features/courses';

import 'swiper/swiper.min.css';
import 'swiper/swiper-bundle.min.css';
import 'swiper/swiper-bundle';
import CreateSlider from '../../../slider/CreateSlider';
SwiperCore.use([Pagination, Navigation]);

export const Courses = () => {
   const dispatch = useDispatch();
   useEffect(() => {
      dispatch(coursesKinds());
   }, []);

   const courses = useSelector((state) => state.coursesReducer.courses);
   console.log(courses);
   return (
      <Fragment>
         <CreateSlider
            minWidth={1100}
            topic='دوره های آموزشی'
            slidesPerView={4}
            items={courses}
            sliderAs='course'
            btnTopic='دوره ها'
         />
         <CreateSlider
            maxWidth={1100}
            minWidth={820}
            topic='دوره های آموزشی'
            slidesPerView={3}
            items={courses}
            sliderAs='course'
            btnTopic='دوره ها'
         />
         <CreateSlider
            maxWidth={820}
            minWidth={580}
            topic='دوره های آموزشی'
            slidesPerView={2}
            items={courses}
            sliderAs='course'
            btnTopic='دوره ها'
         />
         <CreateSlider
            maxWidth={580}
            // minWidth={300}
            topic='دوره های آموزشی'
            slidesPerView={1}
            items={courses}
            sliderAs='course'
            btnTopic='دوره ها'
         />
      </Fragment>
   );
};
