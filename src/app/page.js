'use client'
import react from 'react'

export default function Home() {
  console.log(react);

  return (
    <div className='bg-black flex justify-center items-center min-h-screen text-white'>
      <div className=' bg-red-400 h-[136px] rounded-xl flex justify-center items-center px-4'>
        <h1 className='text-[32px]'>hello World</h1>
      </div>
    </div>
  );
}
