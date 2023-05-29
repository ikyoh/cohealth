import React from 'react'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

const Loader = ({ isSmall = false }) => {

  if (isSmall) return (
    <div className='flex items-center justify-start h-10 w-full'>
      <AiOutlineLoading3Quarters className='text-2xl animate-spin' />
    </div>
  )

  else return (
    <div className='flex items-center justify-center h-full w-full'>
      <AiOutlineLoading3Quarters className='text-4xl animate-spin my-4' />
    </div>
  )
}

export default Loader