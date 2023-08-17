import React from 'react'
import HomePage from './pages/HomePage'
import { Provider } from 'react-redux';
import store from './store/store';
import DrawerNav from './components/Navbar/DrawerNav';
import { AnimatePresence } from 'framer-motion';
import ParticlesContainer from './components/ParticlesContainer';

export default function App() {
  return (
    <Provider store={store}>
      <AnimatePresence mode='wait'>
        <div className='h-screen w-screen overflow-hidden bg-black font-grotesque'>
          <DrawerNav />
          <HomePage />
        </div>
      </AnimatePresence>
    </Provider>
  )
}
