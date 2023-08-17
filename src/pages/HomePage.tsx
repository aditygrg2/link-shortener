import React, { useRef, useState, } from 'react';
import NavBar from '../components/Navbar/NavBar';
import ParticlesContainer from '../components/ParticlesContainer';
import { BiHomeAlt2, BiLoaderAlt, BiLockAlt } from 'react-icons/bi';
import { AiOutlinePlus } from 'react-icons/ai';
import { BsArrowDown, BsQrCode } from 'react-icons/bs';
import axios from 'axios';
import { languages, urls } from "../constants/constant";
import { motion } from 'framer-motion';
import { fadeIn } from '../constants/variants';
import QRCodeModal from '../components/ShortenerTab/QRCodeModal';

const HomePage: React.FC = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const expiryTimeRef = useRef<HTMLInputElement>(null);
    const languageSelectRef = useRef<HTMLSelectElement>(null);
    const customURLRef = useRef<HTMLInputElement>(null);

    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [shortenedLink, setShortenedLink] = useState("");
    const [linkCopied, setLinkCopied] = useState(false);
    const [isQRCodeEnabled, setQRCodeEnabled] = useState(false);

    const [visibleMoreOptions, setVisibleMoreOptions] = useState(false);

    const handleLinkSubmit = async () => {
        setLoading(true);
        let path;
        if (inputRef.current?.value) {
            path = inputRef.current.value;
        }
        else {
            setError(true);
            return;
        }

        try {
            console.log(languageSelectRef.current?.value);
            const response = await axios.post(`${urls.SERVER_URL}/shorten`, {
                path,
                customURL: customURLRef.current?.value,
                expiryTime: expiryTimeRef.current?.value,
                languageSelected: languageSelectRef.current?.value
            })

            if (response.status >= 200 && response.status < 300) {
                setLoading(false);
                const url = urls.SERVER_URL + '/' + response.data.newPath;
                setShortenedLink(url)
                inputRef.current.value = url;
            }
            else {
                // show error
            }

            console.log(response);
        }
        catch (err) {
            console.log(err);
        }
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(shortenedLink);
        setLinkCopied(true);
        setTimeout(() => {
            setLinkCopied(false);
        }, 5000)
    }

    const handleAnotherLink = () => {
        setShortenedLink("");
        if (inputRef.current?.value) {
            inputRef.current.value = "";
        }
    }

    return (
        <div className={`h-full w-full overflow-x-hidden relative`}>
            <NavBar />
            <div className='w-full mt-10 p-4 lg:p-12 flex items-center justify-center relative'>
                <ParticlesContainer />

                <div className='w-full text-white z-10'>
                    <motion.div
                        variants={fadeIn('right', 0.5)} initial='hidden' animate="show" exit='hidden'
                        className='flex flex-col space-y-2'>
                        <h1 className='text-2xl md:text-4xl lg:text-5xl text-gray-500'>urls</h1>
                        <h1 className='text-5xl md:text-6xl lg:text-7xl text-gray-500'>when </h1>
                        <h1 className='text-5xl md:text-6xl lg:text-7xl text-white'>the shorter,</h1>
                        <div className='w-full lg:w-[60%] flex flex-col space-y-2'>
                            <div className={`flex items-center space-x-2 bg-[#121212] px-2.5 py-1.5 rounded-full`}>
                                <div className="">
                                    <BiHomeAlt2 className="text-xl" />
                                </div>
                                {/* searching tab is going to be the same */}
                                <div className="bg-[#222222] rounded-full px-2 py-2 space-x-2 w-full flex items-center">
                                    <BiLockAlt />
                                    <input ref={inputRef} onKeyDown={(e) => {
                                        if(e.key==="Enter"){
                                            shortenedLink.length ? handleCopy() : handleLinkSubmit()
                                        }
                                    }} placeholder="https://urls.cc/shots/" type={'text'} autoFocus className={`bg-transparent outline-none h-8 w-full`} />
                                </div>
                                <div className="flex flex-row items-center space-x-2">
                                    <AiOutlinePlus className="text-xl" />
                                    <span className="h-6 aspect-square rounded-md border-2 text-xs flex items-center justify-center">2</span>

                                    <motion.button
                                        initial={{
                                            rotate: '0'
                                        }}
                                        animate={{
                                            rotate: visibleMoreOptions ? '180deg' : '0',
                                        }}

                                        transition={{
                                            type: 'spring',
                                            damping: '30',
                                            stiffness: '500'
                                        }}

                                        onClick={() => { setVisibleMoreOptions(prev => !prev) }} title='More feature' className='border text-xl p-2 rounded-full'>
                                        <BsArrowDown />
                                    </motion.button>

                                </div>
                            </div>

                            {/* more features */}
                            {
                                <motion.div
                                    initial={{
                                        height: 0
                                    }}
                                    animate={{
                                        height: visibleMoreOptions ? 'auto' : '0',
                                    }}

                                    transition={{
                                        type: 'tween',
                                        damping: '30',
                                        stiffness: '500'
                                    }}

                                    className={`w-full overflow-hidden`}>
                                    <div className='w-full p-2 rounded-lg grid grid-cols-1 items-center justify-center md:grid-cols-2 gap-2'>

                                        <div className="rounded-full bg-[#222222] p-2 flex items-center px-4">
                                            <input ref={customURLRef} placeholder="Custom Domain" type={'text'} className={`bg-transparent outline-none h-7 w-full`} />
                                        </div>

                                        <div className='bg-[#222222] rounded-full p-2 text-gray-400 flex items-center justify-start whitespace-nowrap space-x-2 w-full px-4 cursor-pointer'>
                                            <label htmlFor='date-and-time'>Expiry Time</label>
                                            <input ref={expiryTimeRef} id='date-and-time' title="Date and Time" type={'datetime-local'} className={`bg-transparent outline-none`} />
                                        </div>

                                        <div className='bg-[#222222] rounded-full p-2 text-gray-400 flex items-center justify-between whitespace-nowrap space-x-2 w-full px-4'>
                                            <label htmlFor='translated'>Translate Webpage : {' '}</label>
                                            <select ref={languageSelectRef} id='translated' title='translated-lang' className='bg-transparent outline-none w-full'>
                                                {languages.map(lang => {
                                                    return <option value={lang}>{lang}</option>
                                                })}
                                            </select>
                                        </div>
                                        
                                        {isQRCodeEnabled ? <QRCodeModal link={shortenedLink} toggleModal={setQRCodeEnabled}></QRCodeModal> :
                                            <button title='Generate QR code' className='bg-[#222222] rounded-full p-2 text-gray-400 flex items-center justify-start whitespace-nowrap space-x-2 w-full px-4' onClick={(e) => {
                                                if(shortenedLink){
                                                    setQRCodeEnabled(true);
                                                }
                                                else{
                                                    // setError
                                                }
                                            }}>
                                                <BsQrCode />
                                                <span>Generate QR code</span>
                                            </button>
                                        }

                                    </div>
                                </motion.div>
                            }

                            <div className='flex gap-x-5'>
                                {
                                    <button onClick={shortenedLink.length ? handleCopy : handleLinkSubmit} title='Get Your link' className='border-[0.5px] border-primaryButton-0 text-white items-center flex justify-center text-xl h-12 w-72 tracking-wide rounded-full hover:bg-primaryButton-0 transition-all'>
                                        {
                                            loading ? <BiLoaderAlt className='animate-spin' /> : shortenedLink.length ? linkCopied ? "Copied" : "Copy Link" : "Shorten URL"
                                        }
                                    </button>
                                }
                                {
                                    shortenedLink.length ?
                                        <button onClick={handleAnotherLink} title='create_another' className='bg-[#45a0f5] text-white items-center flex justify-center text-2xl h-12 w-72 tracking-wide rounded-full hover:opacity-80 hover:border-4'>
                                            Create Another
                                        </button> : ""
                                }
                            </div>
                        </div>
                        <h1 className='text-5xl md:text-6xl lg:text-7xl text-gray-500'>the better</h1>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
