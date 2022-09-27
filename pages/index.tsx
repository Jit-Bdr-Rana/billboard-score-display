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
           <Timer initialMinute={0} initialSeconds={0}/>
          </div>
        </div>

      </div>

    </Mainlayout>
  )
}
export default Home


const Timer = (props:any) => {
  const {initialMinute = 0,initialSeconds = 0} = props;
  const [final,setFinal]=useState(5);
  const [ minutes, setMinutes ] = useState(initialMinute);
  const [seconds, setSeconds ] =  useState(initialSeconds);
  
  const reset=()=>{
    setMinutes(0);
    setSeconds(0);
  }

  useEffect(()=>{
    let  myInterval:any;
    if(final!==minutes){
     myInterval = setInterval(() => {
          if (seconds !== 59) {
              setSeconds(seconds + 1);
          }else{
            setSeconds(0)
            setMinutes(minutes + 1);
          }
              if (minutes === 59) {
                  setMinutes(0)
              } else {
              }
      }, 100)
    }
      return ()=> {
          clearInterval(myInterval);
        };
  });

  return (
      <div className='absolute inset-0'>
        <button onClick={()=>reset()}>reset</button>
      { minutes === 0 && seconds === 0
          ? null
          : <h1> {minutes}:{seconds < final ?  `0${seconds}` : seconds}</h1> 
      }
      </div>
  )
}
