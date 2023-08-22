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
import NavBar from './components/Navbar/NavBar';

const App: React.FC = () => {

  return (
    <Provider store={store}>
      <AnimatePresence mode='wait'>
        <Routes>
          <Route path="/" element={
            <div className='h-screen w-screen overflow-hidden font-grotesque background'>
              <div className='h-full w-full overflow-hidden bg-gradient-to-r from-black/80 via-black/60 to-black/0'>
                <NavBar />
                <DrawerNav />
                <div className='h-full w-full absolute top-0 overflow-hidden'>
                  <Register />
                </div>
                <HomePage />
              </div>
            </div>
          }>
          </Route>
          <Route path="/expired" element={<LinkExpired></LinkExpired>} />
        </Routes>
      </AnimatePresence>
    </Provider>
  )
}

export default App;
