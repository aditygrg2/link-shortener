import { BsBoxArrowRight, BsList } from 'react-icons/bs'
import { useAppDispatch } from '../../hooks/reduxHooks'
import { toggleRHN } from '../../store/Slice/RHNSlice';

export default function RHNUser() {
  const dispatch = useAppDispatch();

  return (
    <div className='flex space-x-2'>
      <BsBoxArrowRight size={30}></BsBoxArrowRight>
      <BsList size={30} onClick={() => dispatch(toggleRHN())}></BsList>
    </div>
  )
}
