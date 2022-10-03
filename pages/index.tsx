import type { NextPage } from 'next'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { AdditionalTime, MatchTime, ScoreInterface, TeamInterface } from '../interface/global.interface'
import Mainlayout from '../layouts/Mainlayout'
import { getAdditinalTime } from '../service/gloabl.service'
const Home: NextPage = () => {
  return (
    <Index />
  )
}
const Index = () => {
  const [name, setName] = useState("");
  const [list, setList] = useState<TeamInterface[]>([]);
  const [team, setTeam] = useState<ScoreInterface>({ teamA: 'null', teamB: 'null', goalA: 0, goalB: 0 });
  const [time, setTime] = useState<MatchTime>({ initialMin: 0, initialSec: 0, finalMin: 45, finalSec: 0 });
  const [addiTime, setAddiTime] = useState<AdditionalTime>();
  const onStorageUpdate = useCallback((e: any) => {
    const { key, newValue } = e;
    if (key === "matchTime") {
      setTime(JSON.parse(newValue));
    }
    if (key === 'vsTeam') {
      setTeam(JSON.parse(newValue))
    }
    if (key === 'additionalMatchTime') {
      setAddiTime(JSON.parse(newValue))
      console.log('aaddi time', newValue)
    }
  }, []);

  useEffect(() => {
    setName(localStorage.getItem("name") || "");
    window.addEventListener("storage", onStorageUpdate);
    const lists = localStorage.getItem('teamList');
    if (lists) {
      setList(JSON.parse(lists));
    }
    const times = localStorage.getItem('matchTime')
    if (times) {
      console.log(times)
      setTime(JSON.parse(times))
    }
    const vsTeam = localStorage.getItem('vsTeam')
    if (vsTeam) {
      console.log(times)
      setTeam(JSON.parse(vsTeam))
    }
    const addiTime = getAdditinalTime();
    if (addiTime) {
      console.log(addiTime)
      setAddiTime(addiTime)
    }
    return () => {
      window.removeEventListener("storage", onStorageUpdate);
    };

  }, []);
  return (
    <Mainlayout>
      <div className='bg-black text-white min-h-screen flex-col flex justify-center items-center'>
        <div>
          <h1 className='text-3xl font-bold'>Tournament name</h1>
        </div>
        <div className='flex w-full gap-20 justify-center mt-10 items-start'>
          <div className=' w-[46%] grid grid-cols-1 '>
            <div className='justify-self-end'>
              <div className={`${team?.goalA >= 10 ? 'px-12' : 'px-28'}  border `}>
                <p className='text-[13rem] font-bold'>{team?.goalA || 0}</p>
              </div>
            </div>
            <div className='w-full flex justify-end  mt-6'>
              <div>
                <p className='text-3xl'>{team?.teamA || 'Select Team A '}</p>
              </div>
            </div>
          </div>

          <div className='w-auto  self-end justify-self-center'>
            <p className='text-3xl font-bold'>VS</p>
          </div>

          <div className='w-[46%] items-center grid grid-cols-1 '>
            <div className='justify-self-start'>
              <div className={`${team?.goalB >= 10 ? 'px-12' : 'px-28'}  border `}>
                <p className='text-[13rem] font-bold'>{team?.goalB || 0}</p>
              </div>
            </div>
            <div className='flex justify-start w-full mt-6'>
              <div>
                <p className='text-3xl'>{team?.teamB || 'Select Team B'}</p>
              </div>
            </div>
          </div>
        </div>

        <div className='flex justify-center'>
          <div className=' relative text-7xl px-20  mt-5 font-bold'>
            <Timer className={'absolute inset-0 text-center right-16'} iMinute={time?.initialMin} iSecond={time?.initialSec} status={time?.status || false} restart={time?.restart || false} fMinute={time?.finalMin || 0} fSeconds={time?.finalSec || 0} />
          </div>
        </div>
        {addiTime &&
          <div className='flex justify-center'>
            <div className='relative text-4xl px-12  mt-20 font-bold'>
              {/* <Timer type="add" className={'absolute inset-0 text-red-500 text-center'} status={true} restart={time?.restart || false} iMinute={0} iSecond={0} fMinute={addiTime?.finalMin || 0} fSeconds={addiTime?.finalSec || 0} /> */}
            </div>
          </div>}

      </div>

    </Mainlayout>
  )
}
export default Home



const Timer = React.memo(function ({ iMinute, iSecond, fMinute, fSeconds, restart = false, status, className, type }: any) {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  console.log('child rerender');
  const reset = () => {
    setMinutes(0);
    setSeconds(0);
  }
  const setInitialTime = () => {
    setMinutes(iMinute)
    setSeconds(iSecond)
  }
  useEffect(() => {
    setInitialTime()
  }, [iMinute, iSecond])
  useEffect(() => {
    reset();
    setInitialTime();
  }, [restart, status])


  useEffect(() => {
    let myInterval: any;
    if (status) {
      if (fMinute !== minutes) {
        console.log('set')
        myInterval = setInterval(() => {
          if (seconds < 59) {
            setSeconds((s) => s + 1);
          } else {
            setSeconds((s) => 0)
            setMinutes((m) => m + 1);
          }
          if (minutes > 59) {
            setMinutes((m) => 0)
          } else {
          }
        }, 1000 - 15)
      } else {
        if (fSeconds !== seconds) {
          setSeconds((s: number) => s + 1)
        }
      }
    }
    return () => {
      clearInterval(myInterval);
    };
  });
  Timer.displayName = 'Timer';

  return (
    <div className={className}>
      {!status
        ? <h1 className='flex font-bold'>00:00</h1>
        // : !pause ? <h1 className='flex font-bold'>00:00</h1>
        : <h1 className='flex font-bold'>{type == 'add' && '+'}{`${minutes < 10 ? '0' + minutes : minutes}`}:{seconds < 10 ? `0${seconds}` : seconds}</h1>
      }
    </div>
  )
})
