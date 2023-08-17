import React, { Dispatch, SetStateAction } from 'react'
import QRCode from 'react-qr-code'
import ReactDOM from 'react-dom'

type QRCodeModalProps = {
    link : string,
    toggleModal: Dispatch<SetStateAction<boolean>>;
}

const Backdrop = (props: QRCodeModalProps)  => {
    return <div className='top-0 left-0 fixed w-full h-full z-20 bg-black opacity-50' onClick={() => props.toggleModal(false)}></div>
}

const Modal = (props: QRCodeModalProps) => {
    return (
    <div className='top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 fixed bg-inherit rounded-xl z-30'>
        <div className='flex flex-col items-center'>
            <p className='text-white'>QR Code</p>
            <QRCode value={props.link}  className='z-2'>QRCodeModal</QRCode>
            <p className='text-white' onClick={(e) => alert('copy')}>{props.link}</p>
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
