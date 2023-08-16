import React, {useRef, useState} from 'react';
import NavBar from '../components/Navbar/NavBar';
import ParticlesContainer from '../components/ParticlesContainer';
import ShortenerTab from '../components/ShortenerTab/ShortenerTab';
;
import { BiHomeAlt2, BiLoaderAlt, BiLockAlt } from 'react-icons/bi';
import { AiOutlineLoading, AiOutlinePlus } from 'react-icons/ai';
import { BsThreeDotsVertical } from 'react-icons/bs';
import axios from 'axios';
import {urls} from "../constants/constant";

const HomePage: React.FC = () => {
    const inputRef = useRef<HTMLInputElement>(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [shortenedLink, setShortenedLink] = useState("");
    const [linkCopied, setLinkCopied] = useState(false);

    const handleLinkSubmit = async (e: React.MouseEvent<HTMLElement>) => {
        console.log("Asd");
        setLoading(true);
        let path;
        if(inputRef.current?.value){
            path = inputRef.current.value;
        }
        else{
            setError(true);
            return;
        }
        
        try{
            const response = await axios.post(`${urls.SERVER_URL}/shorten`, {
                path,
            })

            if(response.status >= 200 && response.status < 300){
                setLoading(false);
                const url = urls.CLIENT_URL + '/' + response.data.newPath;
                setShortenedLink(url)
                inputRef.current.value = url;
            }
            else{
                // show error
            }

            console.log(response);
        }
        catch(err){
            console.log(err); 
        }
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(shortenedLink);
        setLinkCopied(true);
        setTimeout(()=>{
            setLinkCopied(false);
        }, 5000)
    }

    const handleAnotherLink = () => {
        setShortenedLink("");
        if(inputRef.current?.value){
            inputRef.current.value = "";
        }
    }

    return (
        <div className={`h-full w-full overflow-x-hidden bg-black bg-none lg:bg-site bg-right bg-contain bg-no-repeat mix-blend-color-dodge z-100`}>
            <div>
                <NavBar />
                <div className='h-full w-foverflow-x-hidden overflow-y-scull roll text-white'>
                    <div className='mt-16 lg:mt-8 flex flex-col space-y-2 mx-2 md:mx-8 lg:ml-24'>
                        <h1 className='text-3xl md:text-4xl lg:text-5xl text-gray-400'>urls</h1>
                        <h1 className='text-5xl md:text-6xl lg:text-7xl text-gray-400'>when </h1>
                        <h1 className='text-5xl md:text-6xl lg:text-7xl text-[#45a0f5]'>the shorter<span className='text-gray-400'>,</span></h1>
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
        </div>
    );
};

export default HomePage;
