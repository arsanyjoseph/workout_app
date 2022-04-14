import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'; 
import LandingPage2 from '../src/pages/landingPage2'
import Login from '../src/pages/login'
import Register from './pages/register';
import './App.css';
import ClientHome from './pages/clientHome';

function App() {
  return (
    <>
    <Router>
      <div className='container'>
        <Routes>
          <Route path='/' element={<LandingPage2/>} />
          <Route path='/home' element={<ClientHome/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
        </Routes>
      </div>
    </Router>
    </>
    
  );
}

export default App;
