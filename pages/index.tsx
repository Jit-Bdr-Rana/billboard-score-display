import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import Mainlayout from '../layouts/Mainlayout'
const Home: NextPage = () => {
  return (
    <Index />
  )
}
const Index = () => {
  return (
    <Mainlayout>
      <div className='bg-black text-white min-h-screen flex-col flex justify-center items-center'>
        <div className='flex gap-16'>
        <div className=''>
            <div className='px-16 border '>
              <p className='text-[10rem] font-bold'>5</p>
            </div>
          </div>
          <div className=''>
            <div className='px-16 border '>
              <p className='text-[10rem] font-bold'>5</p>
            </div>
          </div>
        </div>
        <div className='flex mt-5 gap-16'>
          <div>
            <p className='text-3xl'>hirarhira youth club</p>
          </div>
          <div>
            <p className='text-3xl'>hirarhira youth club</p>
          </div>
        </div>
        <div>
          <div className='p-5 '>
           <Timer initialMinute={5} initialSeconds={0}/>
          </div>
        </div>

      </div>

    </Mainlayout>
  )
}
export default Home


const Timer = (props:any) => {
  const [finalMinutes,setFinalMinute] = useState(0);
  const [ minutes, setMinutes ] = useState(0);
  const [seconds, setSeconds ] =  useState(0);
  useEffect(()=>{
  let myInterval = setInterval(() => {
        if(finalMinutes===minutes){
           clearInterval(myInterval);
        }else{
          if (seconds!==60) {
            setSeconds(seconds + 1);
        }
        if (seconds === 60) {
            if (minutes === 60) {
                clearInterval(myInterval)
            } else {
                setMinutes(minutes + 1);
                setSeconds(0);
            }
        } 
        } 
       
      
      }, 100)
      return ()=> {
          clearInterval(myInterval);
        };
  },[finalMinutes]);

  return (
      <div>
        <div>
          <button className='' onClick={()=>setFinalMinute(3)}>click <menu></menu></button>
          <button className='' onClick={()=>setFinalMinute(3)}>reset <menu></menu></button>
        </div>
      { minutes === 0 && seconds === 0
          ? null
          : <h1> {minutes}:{seconds < 10 ?  `0${seconds}` : seconds}</h1> 
      }
      </div>
  )
}
