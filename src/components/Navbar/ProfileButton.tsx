import { AnimatePresence, motion } from 'framer-motion'
import { useState } from 'react'
import { BsPersonFillCheck } from 'react-icons/bs'
import { useAppSelector } from '../../hooks/reduxHooks';
import UserProfile from '../Auth/UserProfile';
import RightHandSlider from '../Modals/RightHandSliders';

export default function ProfileButton() {
  const [userRHN, setUserRHN] = useState(false);

  const user = useAppSelector(state => state.user);
  const firstName = user.name.split(' ')[0];

  return (
    <>
      <motion.button
        whileTap={{
          scale: 0.8,
          y: 6,
        }}

        onClick={
          () => setUserRHN(prev => !prev)
        }

        className='flex space-x-2 items-center text-primaryButton'>
        <BsPersonFillCheck size={25} className={``} />
        <span className='text-xl font-medium  hidden lg:block '>{firstName}</span>
      </motion.button>

      <AnimatePresence mode='wait'>
        {
          userRHN && 
          <RightHandSlider logo={true} width={30} togglerRHNModal={setUserRHN}>
            <UserProfile/>
          </RightHandSlider>
        }
      </AnimatePresence>
    </>
  )
}
