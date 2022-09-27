import React from 'react'
import SettingLayout from '../../layouts/SettingLayout'

const goal = () => {
  return (
   <Goal/>
  )
}

const Goal=()=>{
    return(
        <SettingLayout>
                <div className='form border p-3'>
              <h1 className='text-center text-xl my-2'>Change Goal</h1>
             <div className='flex gap-6 justify-around items-center select-none px-5'>
              <div className='w-full'>
                    <div>
                    <h1 className='underline'>Team A</h1>
                        <select className='w-full px-3 focus:outline-none mt-2 text-black py-1 text-md' name="" id="">
                            <option value="">Select Team</option>
                            <option value="">Team 1</option>
                            <option value="">Team 1</option>
                            <option value="">Team 1</option>
                        </select>
                    </div>
                    <div className='text-center  w-full flex justify-center'>
                        <input value={5} className='text-black text-center my-5 w-[10%] focus:outline-none py-1' title='display' type="number" readOnly />
                    </div>
                    <div className='flex  text-center justify-center gap-8'>
                    <button className='bg-white hover:bg-slate-300 font-bold text-black py-1 px-5'>+</button>
                    <button className='bg-white hover:bg-slate-300 font-bold text-black py-1 px-5'>-</button>
                    </div>
             </div>
             <div className='text-3xl'>
                 VS
             </div>
             <div className='w-full'>
                    <div>
                    <h1 className='underline'>Team B</h1>
                        <select className='w-full px-3 focus:outline-none mt-2 text-black py-1 text-md' name="" id="">
                            <option value="">Select Team</option>
                            <option value="">Team 1</option>
                            <option value="">Team 1</option>
                            <option value="">Team 1</option>
                        </select>
                    </div>
                    <div className='text-center  w-full flex justify-center'>
                        <input value={5} className='text-black text-center my-5 w-[10%] focus:outline-none py-1' title='display' type="number" readOnly />
                    </div>
                    <div className='flex  text-center justify-center gap-8'>
                    <button className='bg-white font-bold hover:bg-slate-300 text-black py-1 px-5'>+</button>
                    <button className='bg-white font-bold hover:bg-slate-300 text-black py-1 px-5'>-</button>
                    </div>
             </div>
  
            </div>
          </div>
        </SettingLayout>
    )
}


export default goal