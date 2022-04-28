import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {Navigate} from 'react-router-dom'
import './App.css';

import LandingPage2 from '../src/pages/landingPage2'
import Login2 from '../src/components/login2'
import Register from './pages/register';
import ClientHome from './pages/clientHome';
import Dashboard from './pages/dashboard';
import Register2 from '../src/components/register2'

import CoolDownList from './components/coolDowns/coolDownList';
import CreateCoolDown from './components/coolDowns/coolDownCreate';
import CoolDownView from './components/coolDowns/coolDownView';
import NoMatch from './components/nomatch/nomatch'

function App() {
  return (
    <>
    <Router>
      <div className='container'>
        <Routes>
          <Route path='/' element={<LandingPage2/>} />
          <Route path='/home' element={<ClientHome/>} />
          <Route path='/login' element={<Login2/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/dashboard' element={<Dashboard/>}>
            <Route path='home/' element={<Navigate replace to="/home"/>} />
            <Route path='cooldowns/' element={<CoolDownList/>} />
            <Route path='cooldowns/:id' element={<CoolDownView/>} />
            <Route path='cooldowns/new' element={<CreateCoolDown/>} />
          </Route>
          <Route path='/*' element={<NoMatch/>} />
        </Routes>
      </div>
    </Router>
    </>
    
  );
}

export default App;
