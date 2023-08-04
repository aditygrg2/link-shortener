import React from "react";
import {BiLockAlt, BiHomeAlt2} from 'react-icons/bi'
import {AiOutlinePlus} from 'react-icons/ai'
import {BsThreeDotsVertical} from 'react-icons/bs'

const ShortenerTab : React.FC = () => {
    return (
        <div className={`flex items-center space-x-2 bg-[#222222] px-2.5 py-1.5 rounded-full`}>
            <div className="">
                <BiHomeAlt2 className="text-xl"/>
            </div>
            {/* searching tab is going to be the same */}
            <div className="bg-gray-700 rounded-full px-2 py-2 space-x-2 w-full flex items-center">
                <BiLockAlt/>
                <input placeholder="https://urls.cc/shots/" type={'text'} autoFocus className={`bg-transparent outline-none h-8`}/>
            </div>
            <div className="flex flex-row items-center space-x-2">
                <AiOutlinePlus className="text-xl"/>
                <span className="h-6 aspect-square rounded-md border-2 text-xs flex items-center justify-center">2</span>
                <span><BsThreeDotsVertical className="text-xl"/></span>
            </div>
        </div>
    )
}

export default ShortenerTab