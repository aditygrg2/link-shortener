import React from "react";
import { RxAlignLeft, RxArrowLeft, RxArrowRight, RxCross1, RxHamburgerMenu, RxHome } from 'react-icons/rx';

const NavbarList: React.FC = () => {

    interface ulListType {
        listName: string,
    }

    const ulList: ulListType[] = [
        {
            listName: 'My Urls',
        },
        {
            listName: 'Plan',
        },
        {
            listName: 'Features',
        },
    ]

    return (
        <ul className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-8 text-white mb-64 lg:mb-0">
            {
                ulList.map((list, index) => {
                    return (
                        <li key={index} className="w-full flex items-center justify-center whitespace-nowrap">
                            <button title={list.listName} className={`flex w-full justify-center text-gray-400 items-center ${index === 0 ? "active" : ''}`}>
                                {list.listName}
                            </button>
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default NavbarList;