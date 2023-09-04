import React from 'react'
import { CgProfile } from 'react-icons/cg'
import { useAppSelector } from '../../hooks/reduxHooks'

const ProfileSection = () => {
    const user = useAppSelector(state => state.user);

    return (
        <div className='h-20 w-full flex items-center space-x-2'>
            <button className='h-20 aspect-square rounded-full relative flex items-center justify-center'>
                <CgProfile size={90} className='text-primaryButton' />

                {/* <span className='top-0 right-0 absolute text-primaryButton'>
                        <IoMdAddCircleOutline size={24} className="text-white" />
                    </span> */}

            </button>
            <div className="h-full w-full text-lg text-gray-200 px-2 py-3 flex flex-col justify-between">
                <p>{user.name}</p>
                <p>{user.email}</p>
            </div>
        </div>
    )
}

export default ProfileSection
