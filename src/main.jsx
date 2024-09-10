import { React, StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import LandingPage from './pages/LandingPage.jsx'
import UserDashboard from './pages/UserDashboard.jsx'
import AddPd from './pages/AddPd.jsx'
import AddCourse from './pages/AddCourse.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      
      <Route index element ={<LandingPage />} />
      <Route 
        path='/userDashboard/:id'
        element={<UserDashboard />}
        // loader=
      />
      <Route
        path='/addPd'
        element={<AddPd />} 
      />
      <Route
        path='/addCourse'
        element={<AddCourse />} 
      />
  
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
