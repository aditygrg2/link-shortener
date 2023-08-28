import React from "react";
// import {Link} from 'react-router-dom';
import { RxAlignLeft, RxArrowLeft, RxArrowRight, RxCross1, RxHamburgerMenu, RxHome } from 'react-icons/rx';

const NavbarList: React.FC = () => {

    interface ulListType {
        listName: string,
        target : string,
    }

    const ulList: ulListType[] = [
        {
            listName: 'My Urls',
            target : 'myurls',
        },
        {
            listName: 'Plan',
            target : 'plan'
        },
        {
            listName: 'Features',
            target : 'features'
        },
    ]

    return (
        <ul className="flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-8 text-white mb-64 lg:mb-0">
            {
                ulList.map((list, index) => {
                    return (
                        <li key={index} className={`w-full flex text-white items-center justify-center whitespace-nowrap ${index === 0 && 'text-primaryButton'}`}>
                            <button className={``}>{list.listName}</button>
                        </li>
                    )
                })
            }
        </ul>
    )
}

export default NavbarList;