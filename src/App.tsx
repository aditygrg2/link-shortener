import React from 'react'
import HomePage from './pages/HomePage'
import { Provider } from 'react-redux';
import store from './store/store';
import DrawerNav from './components/Navbar/DrawerNav';
import { AnimatePresence } from 'framer-motion';
import ParticlesContainer from './components/ParticlesContainer';
import Login from './components/Login';
import SignUp from './components/SignUp';
import { Route, Routes } from 'react-router-dom';
import LinkExpired from './pages/LinkExpired';

export default function App() {
  return (
    <Provider store={store}>
      <AnimatePresence mode='wait'>
      <Routes>
        <Route path="/" element={
        <div className='h-screen w-screen overflow-hidden bg-black font-grotesque'>
            <DrawerNav />
            <Login/>
            <SignUp/>
            <HomePage />
          </div>
        }>  
        </Route>
        <Route path="/expired" element={<LinkExpired></LinkExpired>}/>
      </Routes>
      </AnimatePresence>
    </Provider>
  )
}
