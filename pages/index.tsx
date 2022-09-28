import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
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
  const onStorageUpdate = (e: any) => {
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
  };

  const handleChange = (e: any) => {
    setName(e.target.value);
    localStorage.setItem("name", e.target.value);
  };

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
        <div className='flex gap-16'>
          <div className=''>
            <div className={`${team?.goalA >= 10 ? 'px-6' : 'px-16'}  border `}>
              <p className='text-[10rem] font-bold'>{team?.goalA || 0}</p>
            </div>
          </div>
          <div className=''>
            <div className={`${team?.goalB >= 10 ? 'px-6' : 'px-16'}  border `}>
              <p className='text-[10rem] font-bold'>{team?.goalB || 0}</p>
            </div>
          </div>
        </div>
        <div className='grid grid-cols-2 mt-5 gap-16'>
          <div className='justify-self-end'>
            <p className='text-3xl'>{team?.teamA || 'Select Team A '}</p>
          </div>
          <div className='justify-self-start'>
            <p className='text-3xl'>{team?.teamB || 'Select Team B'}</p>
          </div>
        </div>
        <div className='flex justify-center'>
          <div className=' relative text-7xl px-14  mt-8 font-bold'>
            <Timer className={'absolute inset-0 text-center right-16'} iMinute={time?.initialMin} iSecond={time?.initialSec} status={time?.status || false} restart={time?.restart || false} fMinute={time?.finalMin || 0} fSeconds={time?.finalSec || 0} />
          </div>
        </div>
        {addiTime &&
          <div className='flex justify-center'>
            <div className='relative text-4xl px-8  mt-24 font-bold'>
              <Timer type="add" className={'absolute inset-0 text-red-500 text-center'} status={true} restart={time?.restart || false} iMinute={0} iSecond={0} fMinute={addiTime?.finalMin || 0} fSeconds={addiTime?.finalSec || 0} />
            </div>
          </div>}

      </div>

    </Mainlayout>
  )
}
export default Home


const Timer = ({ iMinute, iSecond, fMinute, fSeconds, restart = false, status, className, type }: any) => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  console.log(iMinute)
  console.log(iSecond)
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
            setSeconds(seconds + 1);
          } else {
            setSeconds(0)
            setMinutes(minutes + 1);
          }
          if (minutes > 59) {
            setMinutes(0)
          } else {
          }
        }, 1000)
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

  return (
    <div className={className}>
      {!status
        ? <h1 className='flex font-bold'>00:00</h1>
        // : !pause ? <h1 className='flex font-bold'>00:00</h1>
        : <h1 className='flex font-bold'>{type == 'add' && '+'}{`${minutes < 10 ? '0' + minutes : minutes}`}:{seconds < 10 ? `0${seconds}` : seconds}</h1>
      }
    </div>
  )
}
