import React, { useRef, useState, } from 'react';
import NavBar from '../components/Navbar/NavBar';
import ParticlesContainer from '../components/ParticlesContainer';
import { BiCheck, BiCopyAlt, BiHomeAlt2, BiLink, BiLoaderAlt, BiLockAlt, BiPlug, BiPlus } from 'react-icons/bi';
import { AiOutlinePlus } from 'react-icons/ai';
import { BsArrowDown, BsQrCode, BsX } from 'react-icons/bs';
import axios from 'axios';
import { languages, urls } from "../constants/constant";
import { motion } from 'framer-motion';
import { fadeIn } from '../constants/variants';
import QRCodeModal from '../components/Modals/QRCodeModal';

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
        <div className={`h-full w-full overflow-y-scroll scrollbar-hidden overflow-x-hidden relative`}>
            
            <div className='w-full  px-4 lg:px-4 relative z-20'>   

            <ParticlesContainer />

                <div className='w-full text-white overflow-x-hidden overflow-y-scroll mt-10 lg:mt-16 pb-24 scrollbar-hidden'>

                    <motion.div
                        variants={fadeIn('right', 0.5)} initial='hidden' animate="show" exit='hidden'
                        className='flex flex-col space-y-2'>

                        <h1 className='text-2xl md:text-4xl lg:text-5xl text-gray-500'>urls</h1>
                        <h1 className='text-5xl md:text-6xl lg:text-7xl text-gray-500'>when </h1>
                        <h1 className='text-5xl md:text-6xl lg:text-7xl text-gray-100'>the shorter,</h1>

                        <div className='w-full lg:w-[45%] flex flex-col space-y-2'>

                            <div className={`flex items-center space-x-2 border border-primaryButton-0 p-2 rounded-md bg-shadow`}>

                                {/* searching tab is going to be the same */}
                                <div className="bg-transparent rounded-md px-2 py-2 space-x-2 w-full flex items-center">

                                    <button>
                                        <div className="flex flex-row items-center space-x-2">
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

                                                onClick={() => { setVisibleMoreOptions(prev => !prev) }} title='More feature' className=' text-gray-300 text-xl p-2 rounded-md'>
                                                <BsArrowDown />
                                            </motion.button>
                                        </div>
                                    </button>

                                    <input ref={inputRef} onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            shortenedLink.length ? handleCopy() : handleLinkSubmit()
                                        }
                                    }} placeholder="https://urls.cc/shots/" type={'text'} autoFocus className={`bg-transparent outline-none h-8 w-full placeholder:text-gray-400`} />

                                    {shortenedLink.length > 0 && <BsX className='text-4xl text-primaryButton' onClick={handleAnotherLink}></BsX>}

                                    {isQRCodeEnabled ? <QRCodeModal link={shortenedLink} toggleModal={setQRCodeEnabled}></QRCodeModal> :

                                        <button title='Generate QR code' className={`p-2  flex items-center justify-start rounded-md aspect-square ${!shortenedLink.length ? 'text-gray-300' : 'text-white'}`} disabled={!shortenedLink.length ? true : false} onClick={(e) => {
                                            if (shortenedLink) {
                                                setQRCodeEnabled(true);
                                            }
                                            else {
                                                // setError
                                            }
                                        }}>
                                            <BsQrCode />
                                        </button>
                                    }
                                </div>



                                <button onClick={shortenedLink.length ? handleCopy : handleLinkSubmit} title='Get Your link' className='border-[1px] border-primaryButton-0 text-white items-center flex justify-center text-xl h-12 aspect-square tracking-wide rounded-md bg-shadow hover:bg-primaryButton-0 transition-all'>
                                    {
                                        loading ? <BiLoaderAlt className='animate-spin' /> : shortenedLink.length ? linkCopied ? <BiCheck className='text-green-300 text-2xl' /> : <BiCopyAlt /> : <BiLink />
                                    }
                                </button>

                            </div>

                            {/* more features */}
                            {
                                <motion.div
                                    initial={{
                                        height: 0, 
                                        opacity : 0,
                                    }}
                                    animate={{
                                        opacity : 1, 
                                        height: visibleMoreOptions ? 'auto' : '0',
                                    }}

                                    transition={{
                                        type: 'spring',
                                        damping: '20',
                                        stiffness: '500'
                                    }}

                                    className={`w-full border-b border-b-primaryButton-0 backdrop-blur-lg bg-[#121212]/40 rounded-lg overflow-hidden`}>

                                    <div className='w-full p-2 grid grid-cols-1 items-center justify-center md:grid-cols-2 gap-2 text-sm'>

                                        <div className="bg-[#222222] rounded-md p-2 flex items-center px-4 hover:bg-green-500">
                                            <input ref={customURLRef} placeholder="Custom Domain" type={'text'} className={`bg-transparent outline-none w-full`} />
                                        </div>

                                        <div className='bg-[#222222] rounded-md p-2 text-gray-400 flex items-center justify-between whitespace-nowrap space-x-2 w-full px-4 cursor-pointer'>
                                            <label htmlFor='date-and-time'>Expires</label>
                                            <input ref={expiryTimeRef} id='date-and-time' title="Date and Time" type={'datetime-local'} min={new Date().toISOString()} className={`bg-transparent outline-none placeholder:text-xs`} />
                                        </div>

                                        <div className='bg-[#222222] rounded-md p-2 text-gray-400 flex items-center justify-between whitespace-nowrap space-x-2 w-full px-4'>
                                            <select ref={languageSelectRef} id='translated' title='translated-lang' className='bg-transparent outline-none w-full'>
                                                {languages.map(lang => {
                                                    return <option value={lang}>{lang}</option>
                                                })}
                                            </select>
                                        </div>

                                    </div>
                                </motion.div>
                            }

                        </div>
                        <h1 className='text-5xl md:text-6xl lg:text-7xl text-gray-500'>the better</h1>
                    </motion.div>

                </div>
            </div>
        </div>
    );
};

export default HomePage;
