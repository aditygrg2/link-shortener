import axios from 'axios';
import React, { FormEvent, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { LinkRoutes } from '../constants/routes';
import { BsArrowClockwise } from 'react-icons/bs';

export default function PasswordLoader() {
  const params = useParams();
  const urlID = params.id;
  const passwordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if(passwordRef.current?.value){
      setLoading(true);
      const response = await axios.post(LinkRoutes.checkLinkAuth, {
        password: passwordRef.current.value,
        id: urlID
      }, {
        withCredentials: true
      })

      console.log(response);

      if(!response.data.status){
        setLoading(false);
        setError(true);
      }
    }
  }

  return (
    <>
    <div>PasswordLoader</div>
    <form onSubmit={handleSubmit} className='flex'>
        <input placeholder='text' type="text" ref={passwordRef}></input>
        <button type='submit'>Submit</button>
        {loading && <BsArrowClockwise className='animate-spin'></BsArrowClockwise>}
        {error && <p>Incorrect Password</p>}
    </form>
    </>
  )
}
