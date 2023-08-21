import React from 'react'
import HomePage from './pages/HomePage'
import { Provider, useSelector } from 'react-redux';
import store from './store/store';
import DrawerNav from './components/Navbar/DrawerNav';
import { AnimatePresence } from 'framer-motion';
import ParticlesContainer from './components/ParticlesContainer';
import Register from './components/Register/Register';

const App : React.FC = () => {

  return (
    <Provider store={store}>
      <AnimatePresence mode='wait'>
        <div className='h-screen w-screen overflow-hidden bg-black font-grotesque'>
          <DrawerNav />
          <Register/>
          <HomePage />
        </div>
      </AnimatePresence>
    </Provider>
  )
}

export default App;
