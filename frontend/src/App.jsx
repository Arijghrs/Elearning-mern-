import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';

import Auth from './components/Auth';
import Users from './pages/Users';
import Layout from './components/Layout';
import MainLayout from './components/MainLayout';
import Mentors from './pages/Mentors';
import Coursesd from './pages/Coursesdash';
import Certificates from './pages/Certificates';
import AddCourse from './pages/AddCourse';
import Courses from './pages/Courses';
import CoursesA from './pages/CoursesA';
import QuizStart from './pages/QuizStart';
import QuizFinish from './pages/QuizFinish';
import QuizFinishFail from './pages/QuizFinishFail';
import Checkbox from './pages/Checkbox';
import Quiz from './pages/Quiz';
import FillBlanksQuiz from './pages/FillBlanksQuiz';
import PrivateRoute from './components/PrivateRoute.jsx';
import Profile from './pages/Profile.jsx';
import CourseDiscussion from './pages/CourseDiscussion';
import Checkout from './pages/Checkout';
import Payment from './pages/Payment';
import MentorCourse from './pages/MentorCourse';
import HomeScreen from './pages/HomeScreen';
import AddMentor from './pages/AddMentor.jsx';
import QuizReorder from './pages/QuizReorder.jsx';
import Course from './components/Course.jsx';
import Playlist from './components/playlist.jsx';
function App() {
  return (

    <BrowserRouter>
    
    <Routes>
      <Route path="/" element={
          <MainLayout>
            <Home />
          </MainLayout>
        }
      />
      <Route path="/signup" element={
          <MainLayout>
            <Auth />
          </MainLayout>
        }
      />
         <Route
        path="/coursesA"
        element={
          <MainLayout>
            <CoursesA/>
          </MainLayout>
        }
      />
      
     {/*student  */}
      <Route element={<PrivateRoute/>}>

      <Route
        path="/courses"
        element={
          <MainLayout>
            <Courses/>
          </MainLayout>
        }
      />
       <Route
        path="/course"
        element={
          <MainLayout>
            <Course/>
          </MainLayout>
        }
      />
      <Route
        path="/CourseDiscussion"
        element={
          <MainLayout>
            <CourseDiscussion/>
          </MainLayout>
        }
      />
      
      
      <Route
        path="/MentorCourse"
        element={
          <MainLayout>
            <MentorCourse/>
          </MainLayout>
        }
      />
      <Route
        path="/Checkout"
        element={
          <MainLayout>
            <Checkout/>
          </MainLayout>
        }
      />
      <Route
        path="/HomeScreen"
        element={
          <MainLayout>
            <HomeScreen/>
          </MainLayout>
        }
      />
      <Route
        path="/Payment"
        element={
          <MainLayout>
            <Payment/>
          </MainLayout>
        }
      /> 
      <Route
        path="/playlist"
        element={
          <MainLayout>
            <Playlist/>
          </MainLayout>
        }
      />      

   
       <Route
        path="/QuizStart"
        element={
          <MainLayout>
           <QuizStart/>
          </MainLayout>
        }
      />
       <Route
        path="/QuizFinish"
        element={
          <MainLayout>
         <QuizFinish/>
          </MainLayout>
        }
      />
       <Route
        path="/QuizFinishFail"
        element={
          <MainLayout>
         <QuizFinishFail/>
          </MainLayout>
        }
      />
       <Route
        path="/Checkbox"
        element={
          <MainLayout>
            <Checkbox/>
          </MainLayout>
        }
      />
      <Route
        path="/Quiz"
        element={
          <MainLayout>
            <Quiz/>
          </MainLayout>
        }
      />
       <Route
        path="/FillBlanksQuiz"
        element={
          <MainLayout>
            <FillBlanksQuiz/>
          </MainLayout>
        }
      />
        <Route
        path="/QuizReorder"
        element={
          <MainLayout>
            <QuizReorder/>
          </MainLayout>
        }
      />
      <Route
        path="/Course"
        element={<Courses/> }
      />
      {/*mentor and owner interfaces */}
      <Route
        path="/coursesdash"
        element={
          <Layout>
            <Coursesd/>
          </Layout>
        }
      />
      <Route 
        path="/addcourse" 
        element={<AddCourse/>} 
      />
      
     <Route path="/dashboard" element={
          <Layout>
           <Users/>
          </Layout>
        }
      />
      
      <Route
        path="/users"
        element={
          <Layout>
            <Users />
          </Layout>
        }
      />
     <Route
        path="/mentors"
        element={
          <Layout>
            <Mentors/>
          </Layout>
        }
      />
      <Route
        path="/addmentor"
        element={
            <AddMentor/>
          
        }
      />
     
      <Route
        path="/certificates"
        element={
          <Layout>
            <Certificates/>
          </Layout>
        }
      />
       
        <Route path="/profile" element={
          <MainLayout>
            <Profile />
          </MainLayout>
        }
       />

      </Route>


    </Routes>
    </BrowserRouter>
     
  );
}



export default App;
