import React, { ChangeEvent, Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Player, TeamInterface } from '../../interface/global.interface'
import SettingLayout from '../../layouts/SettingLayout'

const playerlist = () => {
  return (
    <PlayerList />
  )
}


const saveList = (list?: TeamInterface[], current?: TeamInterface) => {
  if (list && current) {
    localStorage.setItem('teamList', JSON.stringify([...list, current]));
  }
  if (list && !current) {
    localStorage.setItem('teamList', JSON.stringify(list));
  }
}
const PlayerList = () => {
  const [list, setList] = useState<TeamInterface[]>([]);
  const [team, setTeam] = useState<TeamInterface>();
  const [field, setField] = useState<React.ReactNode[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<string>('');
  const onAdd = () => {
    if (!team) {
      alert('team name is requierd')
      return
    }
    let status: boolean = false;
    list.map((data, index) => {
      if (data?.name == team?.name) {
        status = true
      }
    })
    if (status) {
      alert("Name has already been taken")
      return
    }
    if (team !== undefined) {
      setList([...list, team]);
      const teamName: HTMLInputElement = document.getElementById('teamName') as HTMLInputElement;
      teamName.value = ""
      saveList(list, team)
      setTimeout(() => {
        console.log('list', list)
      }, 5000);
      console.log(list)
    } else {
      window.alert('please enter the team name properly')
    }
  }

  const deletePlayerName = (player: Player, teamName: string) => {
    const teamList: TeamInterface[] = list?.map((data: TeamInterface, index: number) => {
      if (data.name == teamName) {
        if (data.playerList.length > 0) {
          return {
            ...data, playerList: data.playerList.filter((list, index) => {
              return list != player
            })
          }
        } else {
          return data;
        }
      } else {
        return data;
      }
    })
    setList(teamList)
    saveList(teamList)
  }
  const changePlayerStatus = (tname: string, playername: string, captain?: boolean, goalkepper?: boolean, extra?: boolean) => {
    const teamList: TeamInterface[] = list?.map((data: TeamInterface, index: number) => {
      if (data.name == tname) {
        if (data.playerList.length > 0) {
          return {
            ...data, playerList: data.playerList.map((list, index) => {
              if (list.name == playername) {
                return {
                  ...list,
                  captain: captain,
                  goalkepper: goalkepper,
                  extra: extra
                }
              } else {
                return list;
              }
            })
          }
        } else {
          return data;
        }
      } else {
        return data;
      }
    })
    setList(teamList)
    saveList(teamList)
    console.log(teamList)
  }
  useEffect(() => {
    const listFromStorage = JSON.parse(localStorage.getItem('teamList') as string)
    if (listFromStorage) {
      setList(listFromStorage)
    }
  }, [])
  return (
    <SettingLayout>
      <div className='form border p-3 my-3 py-5'>
        <h1 className='text-center text-xl my-2'>Add Team and player</h1>
        <div className='grid grid-cols-2 gap-10 justify-center i items-end'>
          <div>
            <h1 className='underline'>Team Name</h1>
            <input required id='teamName' title='minute' onChange={(e: ChangeEvent<HTMLInputElement>) => setTeam({ name: e.target.value, playerList: [] })} className=' px-3  w-full focus:outline-none mt-1 text-gray-700 py-1 text-md' type="text" />
          </div>

          <div className='flex gap-3 select-none'>
            <button onClick={() => onAdd()} className='bg-white hover:bg-slate-300 text-black py-1 px-5'>Add</button>
          </div>
        </div>
        <hr className='my-3 mt-5' />
        <div className='grid grid-cols-12 gap-5 justify-center  items-end'>
          <div className='flex col-span-6 justify-between gap-5 items-end'>
            <div>
              <h1 className='underline'>Slelect the Team </h1>
              <select onChange={(e: ChangeEvent<HTMLSelectElement>) => setSelectedTeam(e.target.value)} title='team list' className=' px-3  focus:outline-none mt-1 text-black py-1.5 text-md' id="">
                <option value="">slect the team name</option>
                {
                  list?.length > 0 && list.map((data, index) => {
                    return (
                      <option key={index} value={data?.name}>{data?.name}</option>
                    )
                  })
                }
              </select>
            </div>

          </div>

          <div className='col-span-6'>

          </div>
        </div>
        <div className='w-1/2'>
          <ul className='py-2 '>
            {
              list.length > 0 && list?.find(cur => cur.name == selectedTeam)?.playerList?.map((data, index) => {
                return (
                  <li key={index} className='relative flex group p-0.5  cursor-pointer'>
                    <span className='w-[10%]'>{data.playerNumber}{')'}</span>
                    <span className='w-[80%]'>{data.name}</span>
                    <span className='absolute right-5 inset-y-0 '>
                      <span onClick={() => changePlayerStatus(selectedTeam, data.name, !data.captain, data.goalkepper, data.extra)} className={`mr-3 border rounded-full ${data.captain ? 'text-white border-white' : 'text-black border-black'} px-2 hover:text-white hover:border-white`}>C</span>
                      <span onClick={() => changePlayerStatus(selectedTeam, data.name, data.captain, !data.goalkepper, data.extra)} className={`mr-3 border rounded-full ${data.goalkepper ? 'text-white border-white' : 'text-black border-black'} px-2 hover:text-white hover:border-white `}>GK</span>
                      <span onClick={() => changePlayerStatus(selectedTeam, data.name, data.captain, data.goalkepper, !data.extra)} className={`mr-3 border rounded-full ${data.extra ? 'text-white border-white' : 'text-black border-black'} px-2 hover:text-white hover:border-white `}>EX</span>
                      <span onClick={() => deletePlayerName(data, selectedTeam)} className={`border rounded-full text-red-500 border-red-500 px-2 hover:text-red-600 hover:border-red-600 `}>X</span>
                    </span>
                  </li>
                )
              })
            }


            {

              field.length > 0 && field?.map((data, index) => {
                return data
              })
            }
            {selectedTeam != '' &&
              <li className='text-center  mt-2 select-none w-full'>
                <button onClick={() => setField((field) => [...field, <AddFiled selectedTeam={selectedTeam} list={list} setList={setList} setField={setField} key={new Date().getTime()} field={[...field]} />])} className='text-lg w-full bg-black px-5'>+</button>
              </li>}
          </ul>
        </div>
      </div>
      <div className='form border p-3 mt-3'>
        <h1 className='text-center text-xl my-2'>Team List</h1>
        <div className='grid grid-cols-3 gap-5 justify-center   items-start'>
          {
            list?.length > 0 && list?.map((data: TeamInterface, index: number) => {
              return (
                <TeamList key={index} list={list} current={data} setList={setList} />
              )
            })
          }

        </div>
      </div>
    </SettingLayout>
  )
}

export default playerlist


const TeamList = ({ list, current, setList }: { list: TeamInterface[], current: TeamInterface, setList: Dispatch<SetStateAction<TeamInterface[]>> }) => {
  const [open, setOpen] = useState(false);
  const deleteTeam = () => {
    const check = window.prompt("Are you sure you want to delete team?", 'true')
    if (check == 'true') {
      const filterlist: TeamInterface[] = list.filter((data, index) => {
        return data != current
      });
      setList(filterlist)
      saveList(filterlist)
    }
  }
  return (
    <div className='items-center select-none'>
      <div className='bg-white cursor-pointer text-black px-3 flex justify-between items-start'>
        <div className='w-[90%]'>
          <h1 onClick={() => setOpen((set) => !set)} className="select-none">{current?.name}</h1>
        </div>
        <div className="flex gap-2">
          <button onClick={() => deleteTeam()} type='button' className='text-lg text-red-700' >x</button>
        </div>
      </div>
      {open &&
        <div>
          <ul className='p-2'>
            {
              current?.playerList?.map((data, index) => {
                return (
                  <React.Fragment key={index}>
                    <li className='relative flex group p-0.5  cursor-pointer'>
                      <span className='w-[10%]'>{data.playerNumber}</span>
                      <span className='w-[80%]'>{data.name}</span>
                      <span className='absolute right-5 inset-y-0 '>
                        <span className={`mr-3 border rounded-full ${data.captain ? 'text-white border-white' : 'hidden'} px-2 `}>C</span>
                        <span className={`mr-3 border rounded-full ${data.goalkepper ? 'text-white border-white' : 'hidden'} px-2  `}>GK</span>
                        <span className={`border rounded-full ${data.extra ? 'text-white border-white' : 'hidden'} px-2  `}>EX</span>
                      </span>
                    </li>
                  </React.Fragment>
                )
              })
            }
          </ul>
        </div>
      }
    </div>
  )
}


const AddFiled = ({ field, key, setField, list, setList, selectedTeam }: { field: React.ReactNode[], key: number, setField: Dispatch<SetStateAction<React.ReactNode[]>>, setList: Dispatch<SetStateAction<TeamInterface[]>>, list: TeamInterface[], selectedTeam?: string }) => {
  const [playerName, setPlayerName] = useState<string>('')
  const [playerNumber, setPlayerNumber] = useState<number>(0);
  const remove = () => {
    return setField(field.filter((cur: any) => cur['key'] != key))
  }
  const savePlayer = () => {
    console.log(selectedTeam)
    if (selectedTeam) {
      console.log('hello')
      const t = list.find((cur) => cur.name == selectedTeam)
      if (t) {
        const team: TeamInterface = {
          name: t.name,
          playerList: [
            ...t.playerList,
            {
              name: playerName,
              captain: false,
              playerNumber: playerNumber
            }
          ]
        };
        setList(list.map((data, index) => {
          if (data.name == selectedTeam) {
            return team;
          }
          return data;
        }))
        saveList(list.map((data, index) => {
          if (data.name == selectedTeam) {
            return team;
          }
          return data;
        }));
        remove();
      }
    }
  }
  return (
    <li className='flex gap-2 w-full mt-1'>
      <input title='k' type="number" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPlayerNumber(parseInt(e.target.value))} className="w-[6%] text-gray-600 focus:outline-none pl-1 py-1" />
      <input title='d' type="text" onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPlayerName(e.target.value)} className="w-[84%] focus:outline-none text-gray-600 pl-2 py-1" />
      <button className='bg-white hover:bg-slate-300 text-black py-1 text-sm px-3' onClick={() => remove()}>Remove</button>
      <button className='bg-white hover:bg-slate-300 text-black py-1 text-sm px-3' onClick={() => savePlayer()}>Add</button>
    </li>
  )
}