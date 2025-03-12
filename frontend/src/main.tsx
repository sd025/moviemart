import './index.css'
import ReactDOM from "react-dom/client";
import App from './App.tsx'
import store from './redux/store.ts'
import Home from './pages/Home.tsx'
import {Provider} from 'react-redux'
import {Route, RouterProvider, createRoutesFromElements} from 'react-router'
import { createBrowserRouter } from 'react-router-dom'
import Login from './pages/Auth/Login.tsx'
import Register from './pages/Auth/Register.tsx'
import Profile from './pages/User/Profile.tsx'
import PrivateRoute from './pages/Auth/PrivateRoute.tsx'
import ManageProfiles from './pages/User/Manage.tsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<Home />}/>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
 
      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/profiles" element={<ManageProfiles />} />
      </Route>
    </Route>
  )
)
ReactDOM.createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
)
