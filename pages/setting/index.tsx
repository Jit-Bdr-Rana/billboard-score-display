import React from 'react'
import SettingLayout from '../../layouts/SettingLayout'

const index = () => {
  return (
    <Setting/>
  )
}

export default index

const Setting=()=>{
    return(
        <SettingLayout>
          <div className='form border p-3'>
              <h1 className='text-center text-xl my-2'>Match time</h1>
             <div className='grid grid-cols-3 items-end'>
              <div>
                <h1 className='underline'>Set Minute</h1>
                <input defaultValue={0} title='minute'  className='w-1/2 px-3 focus:outline-none mt-1 text-black py-1 text-md' type="number" />
             </div>
             <div>
                <h1 className='underline'>Set Second</h1>
                <input defaultValue={0} title='second' className='w-1/2 px-3 focus:outline-none mt-1 text-black py-1 text-md' type="number" />
             </div>
             <div className='flex gap-3 select-none'>
                <button className='bg-white hover:bg-slate-300 text-black py-1 px-5'>Reset</button>
                <button className='bg-white hover:bg-slate-300 text-black py-1 px-5'>Start</button>
            </div>
            
            </div>
          </div>
          <div className='form border p-3 mt-3'>
              <h1 className='text-center text-xl my-2'>Additionl Minute</h1>
             <div className='grid grid-cols-3 items-end'>
              <div>
                <h1 className='underline'>Set Minute</h1>
                <input title='minute'  className='w-1/2 px-3 focus:outline-none mt-1 text-black py-1 text-md' type="number" />
             </div>
             <div>
                <h1 className='underline'>Set Second</h1>
                <input title='second' className='w-1/2 px-3 focus:outline-none mt-1 text-black py-1 text-md' type="number" />
             </div>
             <div className='flex gap-3 select-none'>
                <button className='bg-white hover:bg-slate-300 text-black py-1 px-5'>Reset</button>
                <button className='bg-white hover:bg-slate-300 text-black py-1 px-5'>Start</button>
            </div>
            </div>
          </div>
        </SettingLayout>
    )
}