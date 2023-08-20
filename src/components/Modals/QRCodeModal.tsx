import React, { Dispatch, SetStateAction } from 'react'
import QRCode from 'react-qr-code'
import ReactDOM from 'react-dom'

type QRCodeModalProps = {
    link: string,
    toggleModal: Dispatch<SetStateAction<boolean>>;
}

const Backdrop = (props: QRCodeModalProps) => {
    return <div className='top-0 left-0 fixed w-full h-full z-20 backdrop-blur-sm' onClick={() => props.toggleModal(false)}></div>
}

const Modal = (props: QRCodeModalProps) => {
    return (
        <div className='top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 fixed bg-inherit rounded-xl z-30 w-full aspect-square'>

            <div className='flex flex-col items-center space-y-10'>

                <QRCode value={props.link} className='z-2 border border-orange-200 rounded-md bg-shadow mix-blend-color-dodge'>QRCodeModal</QRCode>

                <div className="flex flex-col space-y-4 lg:space-y-0 items-center lg:flex-row lg:space-x-4">
                    <button className="py-2 px-4 flex items-center justify-center text-white rounded-lg border-[0.5px] border-primaryButton-0 hover:bg-primaryButton-0 transition-all text-sm">Visit Url</button>
                    <button className="py-2 px-4 flex items-center justify-center bg-primaryButton-0 text-white rounded-lg text-sm hover:scale-105 transition-all">Create Another</button>
                </div>

            </div>
        </div>
    )
}

const overlay = document.getElementById('overlay');

export default function QRCodeModal(props: QRCodeModalProps) {
    return (
        <>
            {ReactDOM.createPortal(<Backdrop {...props} />, overlay!)}
            {ReactDOM.createPortal(<Modal {...props} />, overlay!)}
        </>
    )
}
