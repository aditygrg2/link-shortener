import React, { useState } from 'react'
import { BiDownArrow } from 'react-icons/bi'
import { CgProfile } from 'react-icons/cg';
import { AnimatePresence, motion } from 'framer-motion';

import { IoMdAddCircleOutline } from 'react-icons/io'
import { useAppSelector } from '../../hooks/reduxHooks';
import ProfileSection from './ProfileSection';

const UserProfile = () => {
    const user = useAppSelector(state => state.user);

    return (
        <div className='h-full w-full px-2 py-4'>

            {/* Profile Section */}
            <ProfileSection/>

            {/* accountSetting */}
            <div className='flex flex-col space-y-4 mt-10 text-lg font-medium text-primaryButton'>


                <motion.button
                    whileTap={{
                        scale: 0.9,
                    }}

                    className='h-12 w-full rounded-md bg-primaryButton-0 text-white flex space-x-2 items-center justify-center'>
                    <span>Log Out</span>
                </motion.button>

                
            </div>
        </div>
    )
}

export default UserProfile