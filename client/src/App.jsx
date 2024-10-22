import { BrowserRouter, Route, Routes } from 'react-router-dom'; 
import './App.css';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Create from './components/Create';
import Combine from './components/Combine';


function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/create' element={<Create/>} />
          <Route path='/combine' element={<Combine/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
