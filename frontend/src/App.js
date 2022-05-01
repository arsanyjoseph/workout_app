import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {Navigate} from 'react-router-dom'
import './App.css';

import LandingPage2 from '../src/pages/landingPage2'
import Login2 from '../src/components/login2'
import Register from './pages/register';
import ClientHome from './pages/clientHome';
import Dashboard from './pages/dashboard';

import WorkoutCreate from './components/workouts/workoutCreate';
import WorkoutList from './components/workouts/workoutList';
import WorkoutView from './components/workouts/workoutView';

import Users from './components/users/users';
import UserView from './components/users/userView';

import UserGroupView from './components/userGroup/userGroupView';
import UserGroupCreate from './components/userGroup/userGroupCreate';
import UserGroup from './components/userGroup/userGroupList';

import UploadAvatar from './components/imageUpload/imageUpload';
import NoMatch from './components/nomatch/nomatch'

function App() {
  return (
    <>
    <Router>
      <div className='container'>
        <Routes>
          <Route path='/' element={<LandingPage2/>} />
          <Route path='/login' element={<Login2/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/home' element={<ClientHome/>} >
            <Route path='editavatar/' element={<UploadAvatar/>} />
          </Route>
          <Route path='/dashboard' element={<Dashboard/>}>
            <Route path='home/' element={<Navigate replace to="/home"/>} />

            <Route path='' element={<Navigate replace to="/dashboard/users/"/>} />

            <Route path='users/' element={<Users/>} />
            <Route path='users/:id' element={<UserView/>} />

            <Route path='usergroups/' element={<UserGroup/>} />
            <Route path='usergroups/:id' element={<UserGroupView/>} />
            <Route path='usergroups/new' element={<UserGroupCreate/>} />

            <Route path=':type' element={<WorkoutList/>} />
            <Route path=':type/:id' element={<WorkoutView/>} />
            <Route path=':type/new' element={<WorkoutCreate/>} />


          </Route>

          <Route path='/notfound' element={<NoMatch/>} />
          <Route path='/*' element={<NoMatch/>} />
        </Routes>
      </div>
    </Router>
    </>
    
  );
}

export default App;
