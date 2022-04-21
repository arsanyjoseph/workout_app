import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'; 
import LandingPage2 from '../src/pages/landingPage2'
import Login2 from '../src/components/login2'
import Register from './pages/register';
import './App.css';
import ClientHome from './pages/clientHome';
import Dashboard from './pages/dashboard';
import CoolDownList from './components/coolDowns/coolDownList';
import CreateCoolDown from './components/coolDowns/coolDownCreate';

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
            <Route path='cooldown/' element={<CoolDownList/>} />
            <Route path='cooldown/new' element={<CreateCoolDown/>} />
          </Route>
        </Routes>
      </div>
    </Router>
    </>
    
  );
}

export default App;
