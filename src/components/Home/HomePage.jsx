import React, { Fragment } from 'react';
import { Baner } from './Baner';
import { Courses } from './courses/Courses';
import { Footer } from './footer/Footer';

import './homepage.css';
import { TeacherGallery } from './teachers/TeacherGallery';
import { Consultation } from './Consultation';

export const HomePage = () => {
  return (
    <Fragment>
      <div className='home-page'>
        <Baner />
        <Courses />
        <TeacherGallery />
        <Consultation />
      </div>
      <Footer />
    </Fragment>
  );
};