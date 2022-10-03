import React, { ChangeEvent, useEffect, useState } from 'react'
import { AdditionalTime, MatchTime, ScoreInterface, TeamInterface } from '../../interface/global.interface'
import SettingLayout from '../../layouts/SettingLayout'
import { getAdditinalTime, getTime, removeAdditionlTime, removeTime, saveAdditionlTime, saveTeamAndScore, saveTime } from '../../service/gloabl.service'
import { clearInputValue } from '../../utils/utils.interface'
const index = () => {
  return (
    <Setting />
  )
}
export default index

const Setting = () => {
  const [list, setList] = useState<TeamInterface[]>([]);
  const [team, setTeam] = useState<ScoreInterface>({ teamA: 'null', teamB: 'null', goalA: 0, goalB: 0, tournamentName: '' });
  const [time, setTime] = useState<MatchTime>({ initialMin: 0, initialSec: 0, finalMin: 45, finalSec: 0, restart: false, status: false });
  const [addiTime, setAddiTime] = useState<AdditionalTime>({ finalMin: 0, finalSec: 0, status: false });

  const saveTeam = () => {
    saveTeamAndScore(team);
  }
  const start = () => {
    if (team.teamA == 'null' || team.teamB == '') {
      alert("select the vs team first")
      return;
    }
    if (time.finalMin < time.initialMin) {
      console.log(time)
      alert("final time should be greater than start time")
      return;
    }

    setTime({ ...time, status: true })
    saveTime({ ...time, initialMin: time.initialMin || 0, initialSec: time.initialSec || 0, finalMin: time.finalMin || 45, finalSec: time.finalSec || 0, status: true })
    alert('time started')
  }
  const startAdditionalTime = () => {
    if (addiTime.finalMin !== 0) {
      setAddiTime((p) => { return { ...p, status: true } })
      saveAdditionlTime({ ...addiTime, status: true })
    } else {
      alert("please enter the additional time")
    }
  }
  const resetAdditionalTime = () => {
    setAddiTime({ finalMin: 0, finalSec: 0, status: false })
    removeAdditionlTime();
    clearInputValue('addiFinalMin', '0')
    clearInputValue('addiFinalSec', '0')
  }

  const resetTournamemtName = (type: string) => {
    if (type === 'name') {
      setTeam(t => { return { ...t, tournamentName: '' } })
      saveTeamAndScore({ ...team, tournamentName: '' })
    } else {
      setTeam(t => { return { ...t, teamA: 'null', teamB: 'null' } });
      saveTeamAndScore({ ...team, teamA: 'null', teamB: 'null' });
    }
  }
  const reset = () => {
    setTime({ initialMin: 0, initialSec: 0, finalMin: 45, finalSec: 0, restart: false, status: false });
    clearInputValue('finalMin', '45')
    clearInputValue('finalSec', '0')
    clearInputValue('startMin', '0')
    clearInputValue('startSec', '0')
    removeTime();
  }
  const restart = () => {
    setTime({ ...time, restart: !time.restart });
    saveTime({ ...time, restart: !time.restart });

  }
  useEffect(() => {
    const lists = localStorage.getItem('teamList');
    if (lists) {
      setList(JSON.parse(lists));
    }
    const times = getTime();
    if (times) {
      setTime(times)
    }
    const addiTimes = getAdditinalTime();
    if (addiTimes) {
      setAddiTime(addiTimes)
    }
    const teams = localStorage.getItem('vsTeam')
    if (teams) {
      console.log(teams)
      setTeam(JSON.parse(teams))
    }
  }, [])
  return (
    <SettingLayout>
      <div className='form border py-6 p-3'>
        <h1 className='text-center text-xl font-bold mb-2'>Tournament Name</h1>
        <div className='flex gap-6 justify-around items-end select-none '>
          <div className='w-full grid grid-cols-12 items-end gap-6'>
            <div className='col-span-6'>
              <h1 className='underline'>Name</h1>
              <input placeholder='enter the tournament name' defaultValue={team?.tournamentName} onChange={(e: ChangeEvent<HTMLInputElement>) => setTeam((prev) => { return { ...prev, tournamentName: e.target.value } })} title='minute' className='w-full px-3 focus:outline-none mt-1 text-black py-1 text-md' type="text" />
            </div>
            <div className='flex gap-2'>
              <button type='button' title='start' onClick={() => saveTeam()} className='bg-green-700 rounded-sm text-white hover:bg-green-900 py-1 px-5'>Save</button>
              <button type='button' title='start' onClick={() => resetTournamemtName('name')} className='bg-blue-700 rounded-sm text-white hover:bg-blue-900 py-1 px-5'>Reset</button>
            </div>
          </div>


        </div>
      </div>
      <div className='form border py-6 p-3'>
        <h1 className='text-center text-xl mb-2 font-bold'>Choose the versus team</h1>
        <div className='flex gap-6 justify-around items-end select-none '>
          <div className='w-full'>
            <div>
              <h1 className='underline'>Team A</h1>
              <select defaultValue={team.teamA} onChange={(e: ChangeEvent<HTMLSelectElement>) => setTeam((prev) => { return { ...prev, teamA: e.target.value } })} title='teamA' className='w-full px-3 focus:outline-none mt-2 text-black py-1 text-md' name="" id="">
                <option value="null">Select Team</option>
                {
                  list?.length > 0 && list?.map((data, index) => {
                    return (
                      <option key={index} selected={data.name === team.teamA} value={data.name}>{data.name}</option>
                    )
                  })
                }
              </select>
            </div>

          </div>
          <div className='text-3xl'>
            VS
          </div>
          <div className='w-full'>
            <div>
              <h1 className='underline'>Team B</h1>
              <select defaultValue={team.teamB} onChange={(e: ChangeEvent<HTMLSelectElement>) => setTeam((prev) => { return { ...prev, teamB: e.target.value } })} title='teamB' className='w-full px-3 focus:outline-none mt-2 text-black py-1 text-md' name="" id="">
                <option value={'null'}>Select Team</option>
                {
                  list?.length > 0 && list?.map((data, index) => {
                    return (
                      <option key={index} selected={data.name === team.teamB} value={data.name}>{data.name}</option>
                    )
                  })
                }
              </select>
            </div>
          </div>
        </div>
        <div className='text-center flex gap-2 justify-center mt-6'>
          <button type='button' title='start' onClick={() => saveTeam()} className='bg-green-700 rounded-sm text-white hover:bg-green-900 py-1 px-5'>Save</button>
          <button type='button' title='reset' onClick={() => resetTournamemtName('team')} className='bg-blue-700 rounded-sm text-white hover:bg-blue-900 py-1 px-5'>Reset</button>
        </div>
      </div>
      <div className='form border p-3'>
        <h1 className='text-center text-xl my-2 font-bold'>Match time</h1>
        <div className='grid grid-cols-12 gap-y-6 items-end'>
          <div className='col-span-3'>
            <h1 className='underline'>Final Minute</h1>
            <input id='finalMin' required onChange={(e: ChangeEvent<HTMLInputElement>) => setTime((p) => { return { ...p!, finalMin: parseInt(e.target.value) } })} defaultValue={time.finalMin} title='minute' className='w-1/2 px-3 focus:outline-none mt-1 text-black py-1 text-md' type="number" />
          </div>
          <div className='col-span-3'>
            <h1 className='underline'>Final Second</h1>
            <input id="finalSec" required onChange={(e: ChangeEvent<HTMLInputElement>) => setTime((p) => { return { ...p!, finalSec: parseInt(e.target.value) } })} defaultValue={time.finalSec} title='second' className='w-1/2 px-3 focus:outline-none mt-1 text-black py-1 text-md' type="number" />
          </div>
          <div className='col-span-3'>
            <h1 className='underline'>Start Minute</h1>
            <input id="startMin" required onChange={(e: ChangeEvent<HTMLInputElement>) => setTime((p) => { return { ...p!, initialMin: parseInt(e.target.value) } })} defaultValue={time.initialMin} title='second' className='w-1/2 px-3 focus:outline-none mt-1 text-black py-1 text-md' type="number" />
          </div>
          <div className='col-span-3'>
            <h1 className='underline'>Start Second</h1>
            <input id="startSec" required onChange={(e: ChangeEvent<HTMLInputElement>) => setTime((p) => { return { ...p!, initialSec: parseInt(e.target.value) } })} defaultValue={time.initialSec} title='second' className='w-1/2 px-3 focus:outline-none mt-1 text-black py-1 text-md' type="number" />
          </div>
          <div className=' gap-3 col-span-12 flex justify-center select-none'>


            {
              !time?.status ?
                <button type='button' title='start' onClick={() => start()} className='bg-green-700 rounded-sm text-white hover:bg-green-900 py-1 px-5'>Start</button>
                :
                <React.Fragment>
                  <button onClick={() => restart()} type='button' title='restart' className='bg-blue-700 rounded-sm text-white hover:bg-blue-900  py-1 px-5'>Restart</button>
                  <button type='button' title="reset" onClick={() => reset()} className='bg-blue-700 rounded-sm text-white hover:bg-blue-900  py-1 px-5'>Reset</button>
                </React.Fragment>
            }
          </div>

        </div>
      </div>
      <div className='form border p-3 '>
        <h1 className='text-center text-xl my-2 font-bold'>Additionl Minute</h1>
        <div className='grid grid-cols-3 items-end'>
          <div>
            <h1 className='underline'>Minute</h1>
            <input id='addiFinalMin' onChange={(e: ChangeEvent<HTMLInputElement>) => setAddiTime((p) => { return { ...p!, finalMin: parseInt(e.target.value) } })} defaultValue={addiTime?.finalMin} title='minute' className='w-1/2 px-3 focus:outline-none mt-1 text-black py-1 text-md' type="number" />
          </div>
          <div>
            <h1 className='underline'>Second</h1>
            <input id="addiFinalSec" onChange={(e: ChangeEvent<HTMLInputElement>) => setAddiTime((p) => { return { ...p!, finalMin: parseInt(e.target.value) } })} defaultValue={addiTime?.finalSec} title='second' className='w-1/2 px-3 focus:outline-none mt-1 text-black py-1 text-md' type="number" />
          </div>
          <div className='flex gap-3 select-none'>
            {
              !addiTime?.status ?
                <button type='button' title='start' onClick={() => startAdditionalTime()} className='bg-green-700 rounded-sm text-white hover:bg-green-900 py-1 px-5'>Start</button>
                :
                <React.Fragment>
                  <button type='button' title="reset" onClick={() => resetAdditionalTime()} className='bg-blue-700 rounded-sm text-white hover:bg-blue-900  py-1 px-5'>Reset</button>
                </React.Fragment>
            }
          </div>
        </div>
      </div>
    </SettingLayout>
  )
}