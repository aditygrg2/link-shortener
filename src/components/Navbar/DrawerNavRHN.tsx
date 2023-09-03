import React from 'react'
import RightHandSlider from '../RightHandSlider';
import NavbarList from './NavBarList';

const DrawerNav: React.FC = () => {
    return (
        <NavbarList />
    )
}

export default RightHandSlider(DrawerNav);