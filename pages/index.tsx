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
          <div className='flex justify-center relative text-5xl px-10 mt-8 font-bold'>
            <Timer className={'absolute inset-0 text-center right-16'} fMinute={5} fSeconds={0} />
          </div>
        </div>

      </div>

    </Mainlayout>
  )
}
export default Home


const Timer = ({ fMinute, fSeconds, stop = false, className }: any) => {
  // const [finalMinute,setFinalMinute]=useState(5);
  // const [finalSecond,setFinalSecond]=useState(5);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  const reset = () => {
    setMinutes(0);
    setSeconds(0);
    stop = true;
  }

  useEffect(() => {
    let myInterval: any;
    if (fMinute !== minutes && !stop) {
      myInterval = setInterval(() => {
        if (seconds !== 59) {
          setSeconds(seconds + 1);
        } else {
          setSeconds(0)
          setMinutes(minutes + 1);
        }
        if (minutes === 59) {
          setMinutes(0)
        } else {
        }
      }, 1000)
    }
    return () => {
      clearInterval(myInterval);
    };
  });

  return (
    <div className={className}>
      {minutes === 0 && seconds === 0
        ? null
        : <h1> {`${minutes < 10 ? '0' + minutes : minutes}`}:{seconds < 10 ? `0${seconds}` : seconds}</h1>
      }
    </div>
  )
}
