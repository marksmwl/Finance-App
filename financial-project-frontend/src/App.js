import logo from './logo.svg';
import './index.css';
import { Welcome } from './Pages/Welcome'
import Home from './Pages/Home'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Welcome/>}/>
        <Route path='/Home' element={<Home/>}/>
      </Routes>
    </Router>
    
  );
}

export default App;
