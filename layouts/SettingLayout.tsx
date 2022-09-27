import Link from 'next/link'
import React from 'react'
import Mainlayout from './Mainlayout'

const SettingLayout = ({children}:{children:React.ReactNode}) => {
  return (
    <Mainlayout>
        <div className=' min-h-screen text-white '>
            <div className='grid grid-cols-12'>
              <div className=' min-h-screen bg-opacity-[0.99] shadow-2xl border-black bg-black pt-3 col-span-2'>
              <div className='top-5 sticky inset-0'>
              <ul className='grid grid-cols-1 gap-y-2'>
                <Link href='/setting'>
                  <li className='hover:bg-red-900 px-2 py-1.5 border-r-white border-r-4 cursor-pointer  shadow-2xl'>Score and Timer</li>
                </Link>
                <Link href='/setting/goal'>
                  <li className='hover:bg-red-900 px-2 py-1.5 border-r-white border-r-4 cursor-pointer  shadow-2xl'>Goals</li>
                </Link>
                <Link href='/setting/playerlist'>
                  <li className='hover:bg-red-900 px-2 py-1.5 border-r-white border-r-4 cursor-pointer  shadow-2xl'>Player List</li>
                </Link>
              </ul>
              </div>
              </div>
              <div className='col-span-10 p-8 bg-black bg-opacity-[0.97]'>
              {children}
              </div>
            </div>
        </div>
    </Mainlayout>
  )
}

export default SettingLayout