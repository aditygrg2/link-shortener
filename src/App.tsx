import React from 'react'
import HomePage from './pages/HomePage'
import { Provider, useSelector } from 'react-redux';
import store from './store/store';
import DrawerNav from './components/Navbar/DrawerNav';
import { AnimatePresence } from 'framer-motion';
import ParticlesContainer from './components/ParticlesContainer';
import { Route, Routes } from 'react-router-dom';
import LinkExpired from './pages/LinkExpired';
import Register from './components/Register/Register';

const App : React.FC = () => {

  return (
    <Provider store={store}>
      <AnimatePresence mode='wait'>
      <Routes>
        <Route path="/" element={
        <div className='h-screen w-screen overflow-hidden bg-black font-grotesque'>
            <DrawerNav />
          <Register/>
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

export default App;
