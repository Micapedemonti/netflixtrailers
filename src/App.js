import './App.css';
import Login from './components/Login/Login';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Peliculas from './components/Peliculas/Peliculas';
import Footer from './components/Footer/Footer';


const App = () => {
  return (

    <>
    <div className="App">
    <div className='App_body'>
   <BrowserRouter>
      <Routes>
      <Route path = "/" element = {<Login/>}></Route>
      <Route path = "/peliculas" element = {<Peliculas/>}></Route>
      </Routes>
    </BrowserRouter>
</div>
    </div>
    <Footer/>
    </>
  );

}

export default App;
