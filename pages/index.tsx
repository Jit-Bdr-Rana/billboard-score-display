import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Mainlayout from '../layouts/Mainlayout'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <Index />
  )
}
const Index = () => {
  return (
    <Mainlayout>
      <div className='bg-black text-white min-h-screen flex-col flex justify-center items-center'>
        <div className='flex gap-8'>
          <div className=''>
            <div className='p-5 border '>
              <p className='text-9xl font-bold'>0</p>
            </div>
            <p className='text-3xl mt-5'>Team A</p>
          </div>
          <div className=''>
            <div className='p-5 border '>
              <p className='text-9xl font-bold'>0</p>
            </div>
            <p className='text-3xl mt-5'>Team B</p>
          </div>
        </div>
        <div>
          <p className='p-5 text-7xl'>45:10:0</p>
        </div>

      </div>

    </Mainlayout>
  )
}
export default Home
