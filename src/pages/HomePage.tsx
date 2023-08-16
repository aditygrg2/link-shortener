import React, {useRef, useState} from 'react';
import NavBar from '../components/Navbar/NavBar';
import ParticlesContainer from '../components/ParticlesContainer';
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
        <div className={`h-full w-full top-0 left-0 overflow-hidden bg-dark-0`}>
            <NavBar />
            <div className='h-full w-full overflow-x-hidden overflow-y-scroll text-white'>
                <div className='mt-16 lg:mt-8 flex flex-col space-y-2'>
                    <h1 className='text-5xl md:text-6xl lg:text-7xl ml-4 md:ml-12 text-gray-400'>urls</h1>
                    <h1 className='text-5xl md:text-6xl lg:text-7xl ml-4 md:ml-12 text-gray-400'>when </h1>
                    <h1 className='text-5xl md:text-6xl lg:text-7xl ml-4 md:ml-12 text-[#45a0f5]'>the shorter,</h1>
                    <div className='w-full lg:w-[60%] flex flex-col space-y-2 md:px-4 px-2'>
                    <div className={`flex items-center space-x-2 bg-[#222222] px-2.5 py-1.5 rounded-full`}>
                    <div className="">
                        <BiHomeAlt2 className="text-xl"/>
                    </div>
                    {/* searching tab is going to be the same */}
                    <div className="bg-gray-700 rounded-full px-2 py-2 space-x-2 w-full flex items-center">
                        <BiLockAlt/>
                        <input ref={inputRef} placeholder="https://urls.cc/shots/" type={'text'} autoFocus className={`bg-transparent outline-none h-8 w-full`}/>
                    </div>
                    <div className="flex flex-row items-center space-x-2">
                        <AiOutlinePlus className="text-xl"/>
                        <span className="h-6 aspect-square rounded-md border-2 text-xs flex items-center justify-center">2</span>
                        <span><BsThreeDotsVertical className="text-xl"/></span>
                    </div>
                </div>
                    <div className='flex gap-x-5'>
                        {<button onClick={shortenedLink.length ? handleCopy : handleLinkSubmit} title='Get Your link' className='bg-[#45a0f5] text-white items-center flex justify-center text-2xl h-12 w-72 tracking-wide rounded-full hover:opacity-80 hover:border-4'>{loading ? <BiLoaderAlt className='animate-spin'/> : shortenedLink.length ? linkCopied ? "Copied" : "Copy Link" :"Shorten URL"}</button>}
                        {shortenedLink.length ? <button onClick={handleAnotherLink} title='create_another' className='bg-[#45a0f5] text-white items-center flex justify-center text-2xl h-12 w-72 tracking-wide rounded-full hover:opacity-80 hover:border-4'>Create Another</button> : ""}
                    </div>
                </div>
                    <h1 className='text-5xl md:text-6xl lg:text-7xl ml-4 md:ml-12 text-gray-400'>the better</h1>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
