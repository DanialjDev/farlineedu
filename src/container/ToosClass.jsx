import { AnimatePresence } from 'framer-motion';
import { Route, Switch } from 'react-router';
import CompleteProfile from '../components/forms/CompleteProfile';
import Login from '../components/forms/Login';
import Register from '../components/forms/Register';
import MainLayout from '../components/layouts/MainLayout';
import GetCode from '../components/forms/GetCode';
import { Topics } from '../components/courses/Topics';
import { HomePage } from '../components/Home/HomePage';
import ForgerPassword from '../components/forms/ForgerPassword';
import { Contact } from '../components/contact-us/Contact';
import { TeacherGallery } from '../components/teacher-gallery/TeacherGallery';
import { Panel } from '../components/panel/Panel';
import ChangePassword from '../components/forms/ChangePassword';
import ForgotPassCode from '../components/forms/ForgotPassCode';
import { useSelector } from 'react-redux';
import PageNotFound from '../components/404/PageNotFound';
import FirstVideosContainer from '../components/session-one-videos/FirstVideosContainer';
import { EduCal, KeyPlan } from '../components/key-plan/KeyPlan';
import { AccessDenied } from '../components/access-denied/AccessDenied';
import AboutUs from '../components/about-us/AboutUs';
import Provisions from '../components/provisions/Provisions';
import UsualQuestions from '../components/usual-question/UsualQuestions';
import AllPartVideo from '../components/all-one-part-video/AllPartVideo';

const ToosClass = () => {
  const { is_active } = useSelector((state) => state.userReducer.userInfo);
  return (
    <MainLayout>
      <AnimatePresence exitBeforeEnter>
        <Switch>
          <Route path='/register' component={Register} />
          <Route path='/get-code' component={GetCode} />
          <Route path='/enter-code' component={ForgotPassCode} />
          <Route path='/fill-profile' component={CompleteProfile} />
          <Route path='/login' component={Login} />
          <Route path='/courses' component={Topics} />
          <Route path='/forget-password' component={ForgerPassword} />
          <Route path='/change-password' component={ChangePassword} />
          <Route path='/contact-us' component={Contact} />
          <Route path='/teachers' component={TeacherGallery} />
          <Route path='/key-plan' component={KeyPlan} />
          <Route path='/part-one-videos' component={FirstVideosContainer} />
          <Route path='/profile' component={is_active ? Panel : AccessDenied} />
          <Route path='/about-us' component={AboutUs} />
          <Route path='/provisions' component={Provisions} />
          <Route path='/usual-questions' component={UsualQuestions} />
          <Route path='/all-one-part-videos' component={AllPartVideo} />
          <Route path='/' exact component={HomePage} />
          <Route path='*' component={PageNotFound} />
        </Switch>
      </AnimatePresence>
    </MainLayout>
  );
};

export default ToosClass;
