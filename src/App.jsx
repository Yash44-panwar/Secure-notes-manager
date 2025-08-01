import { store } from './store.js'

import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Navbar from './components/Navbar.jsx';
import Home from './components/Home.jsx';
import Paste from './components/Paste.jsx';
import ViewPaste from './components/ViewPaste.jsx';


const router = createBrowserRouter(
  [
     {
      path:"/",
      element:
       <div>
        <Navbar/>
        <Home/>
        
       </div>
     },
     {
      path:"/pastes",
      element:
       <div>
        <Navbar/>
        <Paste/>
        
       </div>
     },
     {
      path:"/pastes/:id",
      element:
       <div>
        <Navbar/>
        <ViewPaste/>
        
       </div>
     }
   
  ]
);

function App() {
  
 

  return (
      
    <div >  
      
     
      <RouterProvider router={router}/>
      
    </div>
  ) 
}

export default App
