import React from "react";
import { useAppSelector } from "../../hooks/reduxHooks";
import ProfileSection from "../Auth/ProfileSection";

const NavbarList: React.FC = () => {

    interface ulListType {
        listName: string,
        target: string,
    }

    const ulList: ulListType[] = [
        {
            listName: 'My Urls',
            target: 'myurls',
        },
        {
            listName: 'Plan',
            target: 'plan'
        },
        {
            listName: 'Features',
            target: 'features'
        },
    ]

    const user = useAppSelector(state => state.user);


    return (
        <ul className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-8 text-white mb-64 lg:mb-0 lg:px-0 px-2">

            {
                user.registered && <li className="lg:hidden">
                    <ProfileSection />
                </li>
            }

            {
                ulList.map((list, index) => {
                    return (
                        <li key={index} className={`w-full py-3 lg:py-0 rounded-md flex items-center justify-center whitespace-nowrap text-primaryButton border border-primaryButton-0 lg:border-none lg:text-white   lg:hover:text-primaryButton`}>
                            <button className={``}>{list.listName}</button>
                        </li>
                    )
                })
            }

            {
                <li className={`w-full lg:hidden py-4 lg:py-0 rounded-md flex items-center justify-center whitespace-nowrap text-white bg-primaryButton-0 text-lg font-medium lg:border-none lg:text-white   lg:hover:text-primaryButton`}>
                    <button >Log Out</button>
                </li>
            }
        </ul>
    )
}

export default NavbarList;