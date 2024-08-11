import { Home } from './pages/Home'
import { Signin } from './pages/Signin'
import { Signup } from './pages/Signup'
import { Order } from './pages/Order'
import { Profile } from './pages/Profile'
import { PrevOrders } from './pages/PrevOrders'
import { Address } from './pages/Address'
import { Notification } from './pages/Notification'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import './App.css' 

function App() {
  

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/home' element={<Home/>}/>
      <Route path='/signin' element={<Signin/>}/>
      <Route path='/signup' element={<Signup/>}/>
      <Route path='/order' element={<Order/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/orderhistory' element={<PrevOrders/>}/>
      <Route path='/addressdetails' element={<Address/>}/>
      <Route path='/notifications' element={<Notification/>}/>
    </Routes>
    </BrowserRouter>
  )
}

export default App
