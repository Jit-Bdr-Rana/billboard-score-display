import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import Mainlayout from './Mainlayout'

const SettingLayout = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  return (
    <Mainlayout>
      <div className=' min-h-screen text-white '>
        <div className='grid grid-cols-12'>
          <div className=' min-h-screen bg-opacity-[0.99] shadow-2xl border-black bg-black pt-3 col-span-2'>
            <div className='top-5 sticky inset-0'>
              <ul className='grid grid-cols-1 gap-y-2'>
                <Link href='/setting'>
                  <li className={` ${router.pathname === '/setting' ? 'bg-red-900 border-r-white border-r-4 ' : ''}hover:bg-red-900 hover:border-r-4 hover:border-r-white px-2 py-1.5   cursor-pointer  shadow-2xl`}>Score and Timer</li>
                </Link>
                <Link href='/setting/goal'>
                  <li className={` ${router.pathname === '/setting/goal' ? 'bg-red-900 border-r-white border-r-4 ' : ''}hover:bg-red-900 hover:border-r-4 hover:border-r-white px-2 py-1.5   cursor-pointer  shadow-2xl`}>Goals</li>
                </Link>
                <Link href='/setting/playerlist'>
                  <li className={` ${router.pathname === '/setting/playerlist' ? 'bg-red-900 border-r-white border-r-4 ' : ''}hover:bg-red-900 hover:border-r-4 hover:border-r-white px-2 py-1.5   cursor-pointer  shadow-2xl`}>Player List</li>
                </Link>
                <Link href='/setting/screen'>
                  <li className={` ${router.pathname === '/setting/screen' ? 'bg-red-900 border-r-white border-r-4 ' : ''}hover:bg-red-900 hover:border-r-4 hover:border-r-white px-2 py-1.5   cursor-pointer  shadow-2xl`}>Screen</li>
                </Link>
              </ul>
            </div>
          </div>
          <div className='col-span-10 p-8 bg-black bg-opacity-[0.90]'>
            {children}
          </div>
        </div>
      </div>
    </Mainlayout>
  )
}

export default SettingLayout