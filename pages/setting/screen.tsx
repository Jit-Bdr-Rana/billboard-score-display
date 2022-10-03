import React, { useEffect, useState } from 'react'
import { ScreenType } from '../../interface/global.interface'
import SettingLayout from '../../layouts/SettingLayout'
import { SaveScreen } from '../../service/gloabl.service'

const screen = () => {
    return (
        <Screen />
    )
}

export default screen

const Screen = () => {
    const [screen, setScreen] = useState<ScreenType>(ScreenType.scoreAndTimer);

    useEffect(() => {
        SaveScreen(screen)
    }, [screen, setScreen])

    return (
        <SettingLayout>
            <div className='form border p-3'>
                <h1 className='text-center text-xl font-bold  my-2'>Change Display Screen</h1>
                <div className='text-lg text-center    justify-center mx-auto'>
                    <h1 className='bg-green-600 inline-block px-16 py-1'>Active screen: {screen}</h1>
                </div>
                <div className='flex gap-6 flex-wrap justify-around items-center select-none py-5 '>
                    <div className=' grid grid-cols-2 gap-6 justify-around w-full'>
                        <div className='justify-self-center'>
                            <h1 className='text-lg'>Score And Timer </h1>

                        </div>
                        <div className='justify-self-center'>
                            {
                                screen != ScreenType.scoreAndTimer ?
                                    <button onClick={() => setScreen(ScreenType.scoreAndTimer)} type='button' title='restart' className='bg-blue-700 rounded-sm text-white hover:bg-blue-900  py-1 px-5'>show</button>
                                    : <button onClick={() => setScreen(ScreenType.scoreAndTimer)} type='button' title='restart' className='bg-red-700 rounded-sm text-white hover:bg-red-900  py-1 px-5'>hide</button>
                            }
                        </div>
                    </div>
                    <div className='grid grid-cols-2 gap-6 justify-around w-full'>
                        <div className='justify-self-center'>
                            <h1 className='text-lg'>Player List</h1>
                        </div>
                        <div className='justify-self-center'>
                            {
                                screen != ScreenType.playerList ?
                                    <button onClick={() => setScreen(ScreenType.playerList)} type='button' title='restart' className='bg-blue-700 rounded-sm text-white hover:bg-blue-900  py-1 px-5'>show</button>
                                    :
                                    <button type='button' title='restart' className='bg-red-700 rounded-sm text-white hover:bg-red-900  py-1 px-5'>hide</button>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </SettingLayout>
    )
}