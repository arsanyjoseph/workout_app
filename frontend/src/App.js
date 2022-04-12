import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'; 
import ClientHome from '../src/pages/clientHome'
import Dashboard from '../src/pages/dashboard'
import LandingPage from '../src/pages/landingPage'
import Login from '../src/pages/login'
import Register from './pages/register';
import './App.css';
import Header from './components/header';

function App() {
  return (
    <>
    <Router>
      <div className='container'>
        <Header/>
        <Routes>
          <Route path='/' element={<LandingPage/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
        </Routes>
      </div>
    </Router>
    </>
    
  );
}

export default App;
