
import './App.css';
import Navbar from './components/navbar/Navbar';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import ShopCategory from './pages/ShopCategory';
import Shop from './pages/Shop';
import Products from './pages/Products';
import Cart from './pages/Cart';
import LoginSignup from './pages/LoginSignup';
import { Footer } from './components/Footer/Footer';
import men_banner from './components/assests/banner_mens.png'
import women_banner from './components/assests/banner_women.png'
import kids_banner from './components/assests/banner_kids.png'
import { Newcollections } from './components/NewCollections/Newcollections';
function App() {
  return (
    <div >    
      <BrowserRouter>
        <Navbar/> {/*available for all pages*/}
        <Routes>
          <Route path='/' element={<Shop/>}/>
          <Route path='/men' element={<ShopCategory banner={men_banner} category="men"/>}/>
          <Route path='/women' element={<ShopCategory banner={women_banner} category="women"/>}/>
          <Route path='/kids' element={<ShopCategory banner={kids_banner} category="kid"/>}/>
          <Route path='/product' element={<Products/>}>
          <Route path=':productId' element ={<Products/>}/>
          </Route>
          <Route path='/cart' element={<Cart/>}/>
          <Route path='/login' element={<LoginSignup/>}/>
          <Route path='/new' element={<Newcollections/>}/>
        </Routes>
        <Footer/>
      </BrowserRouter> 
      
    </div>
  );
}

export default App;
