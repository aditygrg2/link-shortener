import React, { Dispatch, SetStateAction } from 'react'
import QRCode from 'react-qr-code'
import ReactDOM from 'react-dom'

type RightHandSliderProps = {
    link: string,
    toggleModal: Dispatch<SetStateAction<boolean>>;
}

export default function RightHandSlider(props: RightHandSliderProps) {
    return (
        <>
            {/* {ReactDOM.createPortal(<Backdrop {...props} />, overlay!)}
            {ReactDOM.createPortal(<Modal {...props} />, overlay!)} */}

        </>
    )
}