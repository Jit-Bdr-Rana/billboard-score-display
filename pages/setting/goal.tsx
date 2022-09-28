import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { ScoreInterface } from '../../interface/global.interface'
import SettingLayout from '../../layouts/SettingLayout'
import { saveTeamAndScore } from '../../service/gloabl.service'

const goal = () => {
    return (
        <Goal />
    )
}

const Goal = () => {
    const [team, setTeam] = useState<ScoreInterface>({ teamA: 'null', teamB: 'null', goalA: 0, goalB: 0 });

    useEffect(() => {
        const teams = localStorage.getItem('vsTeam')
        if (teams) {
            console.log(teams)
            setTeam(JSON.parse(teams))
        }
    }, [])

    useEffect(() => {
        console.log(team)
        if (team.teamA != 'null' && team.teamB != 'null') {
            saveTeamAndScore(team)
        }
    }, [team.goalA, team.goalB])
    return (
        <SettingLayout>
            <div className='form border p-3'>
                <h1 className='text-center text-xl my-2'>Change Goal</h1>
                <div className='flex gap-6 justify-around items-center select-none px-5'>
                    <div className='w-full'>
                        <div>
                            <h1 className='underline'>Team A</h1>
                            <select title='teamA' className='w-full px-3 focus:outline-none mt-2 text-black py-1 text-md' name="" id="">
                                {team.teamA &&
                                    <option value={team?.teamA}>{team?.teamA}</option>
                                }
                            </select>
                        </div>
                        <div className='text-center  w-full flex justify-center'>
                            <input defaultValue={5} value={team.goalA} className='text-black text-center my-5 w-[10%] focus:outline-none py-1' title='display' type="number" readOnly />
                        </div>
                        <div className='flex  text-center justify-center gap-8'>
                            <button onClick={() => setTeam((p) => { return { ...p, goalA: p.goalA + 1 } })} className='bg-green-600 hover:bg-green-800 font-bold text-white py-1 px-5'>+</button>
                            <button disabled={team.goalA === 0} onClick={() => setTeam((p) => { return { ...p, goalA: p.goalA - 1 } })} className='bg-red-600 hover:bg-red-800 font-bold text-white  py-1 px-5'>-</button>
                        </div>
                    </div>
                    <div className='text-3xl'>
                        VS
                    </div>
                    <div className='w-full'>
                        <div>
                            <h1 className='underline'>Team B</h1>
                            <select title='teamB' className='w-full px-3 focus:outline-none mt-2 text-black py-1 text-md' name="" id="">
                                {team.teamB &&
                                    <option value={team?.teamB}>{team?.teamB}</option>
                                }
                            </select>
                        </div>
                        <div className='text-center  w-full flex justify-center'>
                            <input defaultValue={5} value={team.goalB} className='text-black text-center my-5 w-[10%] focus:outline-none py-1' title='display' type="number" readOnly />
                        </div>
                        <div className='flex  text-center justify-center gap-8'>
                            <button onClick={() => setTeam((p) => { return { ...p, goalB: p.goalB + 1 } })} className='bg-green-600 hover:bg-green-800 font-bold text-white py-1 px-5'>+</button>
                            <button disabled={team.goalB === 0} onClick={() => setTeam((p) => { return { ...p, goalB: p.goalB - 1 } })} className='bg-red-600 hover:bg-red-800 font-bold text-white  py-1 px-5 '>-</button>
                        </div>
                    </div>

                </div>
            </div>
        </SettingLayout>
    )
}


export default goal