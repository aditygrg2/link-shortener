import React from 'react'
import { BsLink } from 'react-icons/bs'

export default function Loaders() {
  return (
    <div className='h-screen w-screen flex justify-center items-center bg-black'>
        <BsLink className='scale-[25] fill-orange-400 animate-pulse'></BsLink>
    </div>
  )
}
