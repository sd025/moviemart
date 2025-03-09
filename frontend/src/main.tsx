import './index.css'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import store from './redux/store.ts'
import Home from './pages/Home.tsx'
import {Provider} from 'react-redux'
import {Route, RouterProvider, createRoutesFromElements} from 'react-router'
import { createBrowserRouter } from 'react-router-dom'
import Login from './pages/Auth/Login.tsx'
import Register from './pages/Auth/Register.tsx'
import Profile from './pages/Uesr/Profile.tsx'
import PrivateRoute from './pages/Auth/PrivateRoute.tsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App />}>
      <Route index={true} path='/' element={<Home />}/>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="" element={<PrivateRoute />}>
        <Route path="/profile" element={<Profile />} />
      </Route>
    </Route>
  )
)
createRoot(document.getElementById('root')!).render(
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
)
