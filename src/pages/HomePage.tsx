import React from 'react';
import NavBar from '../components/Navbar/NavBar';
import ShortenerTab from '../components/ShortenerTab/ShortenerTab';

const HomePage: React.FC = () => {
    return (
        <div className={`h-full w-full top-0 left-0 overflow-hidden bg-dark-0`}>
            <NavBar />
            <div className='h-full w-full overflow-x-hidden overflow-y-scroll text-white'>
                <div className='mt-16 lg:mt-8 flex flex-col space-y-2 mx-2 md:mx-8 lg:mx-24'>
                    <h1 className='text-3xl md:text-4xl lg:text-5xl text-gray-400'>urls</h1>
                    <h1 className='text-5xl md:text-6xl lg:text-7xl text-gray-400'>when </h1>
                    <h1 className='text-5xl md:text-6xl lg:text-7xl text-[#45a0f5]'>the shorter <span className='text-gray-400'>,</span></h1>
                    <div className='w-full lg:w-[60%] flex flex-col space-y-2'>
                        <ShortenerTab />
                        <div>
                            <button title='Get Your link' className='bg-[#45a0f5] text-white text-2xl h-12 w-72 tracking-wide rounded-full'>Get Yours Link</button>
                        </div>
                    </div>
                    <h1 className='text-5xl md:text-6xl lg:text-7xl text-gray-400'>the better</h1>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
