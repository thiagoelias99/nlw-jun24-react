'use client'

import { ArrowRightIcon, CalendarIcon, MapPinIcon, Settings2Icon, UserRoundPlus } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

export default function Home() {
  const [showUserInput, setShowUserInput] = useState(false)

  return (
    <main className='flex h-svh flex-col justify-center items-center bg-pattern bg-no-repeat bg-center'>
      <div className='max-w-[720px] mx-auto'>
        <div className='w-full flex items-center justify-center'>
          <Image src='/logo.png' alt='plann.er logo' width={170} height={44} />
        </div>
        <p className='text-zinc-300 text-lg w-full text-center mt-2'>Convide seus amigos e planeje sua próxima viagem!</p>




        <div className='w-[720px] mt-5 flex justify-start items-center gap-5 pl-6 pr-4 py-0 bg-zinc-900 h-16 rounded-xl shadow-shape'>
          <div className='flex flex-1 justify-start items-center gap-2'>
            <MapPinIcon className='h-5 w-5 text-zinc-400' />
            <input
              disabled={showUserInput}
              className='bg-transparent placeholder:text-zinc-400' type="text" placeholder="Para onde você vai?" />
          </div>
          <div className='flex justify-end items-center'>
            <div className='w-28 flex justify-end items-center gap-2'>
              <CalendarIcon className='min-h-5 min-w-5 text-zinc-400' />
              <input
                disabled={showUserInput}
                className='bg-transparent placeholder:text-zinc-400' type="text" placeholder='Quando ?' />
            </div>
            <div className='text-zinc-800 h-full'>|</div>
          </div>



          {showUserInput ?
            (<button
              className='bg-zinc-800 hover:bg-zinc-700 h-9 text-zinc-200 rounded-lg flex items-center justify-center gap-2 px-5 py-2'
              onClick={() => setShowUserInput(false)}
            >
              <p>Alterar local/data</p>
              <Settings2Icon className='h-5 w-5' />
            </button>) :
            (<button
              className='bg-lime-300 hover:bg-lime-400 h-9 text-lime-950 rounded-lg flex items-center justify-center gap-2 px-5 py-2'
              onClick={() => setShowUserInput(true)}
            >
              <p>Continuar</p>
              <ArrowRightIcon className='h-5 w-5' />
            </button>)}
        </div>



        {showUserInput && (
          <div className='w-[720px] mt-5 flex justify-start items-center gap-5 pl-6 pr-4 py-0 bg-zinc-900 h-16 rounded-xl shadow-shape'>
            <div className='flex flex-1 justify-start items-center gap-2'>
              <UserRoundPlus className='h-5 w-5 text-zinc-400' />
              <input className='bg-transparent placeholder:text-zinc-400' type="text" placeholder="Quem estará na viagem?" />
            </div>
            <button className='bg-lime-300 hover:bg-lime-400 h-9 text-lime-950 rounded-lg flex items-center justify-center gap-2 px-5 py-2'>
              <p>Confirmar viagem</p>
              <ArrowRightIcon className='h-5 w-5' />
            </button>
          </div>
        )}



        <p className='w-full text-center text-zinc-500 text-sm mt-5'>Ao planejar sua viagem pela plann.er você automaticamente concorda <br />
          com nossos <span className='text-zinc-300 underline'>termos de uso</span> e <span className='text-zinc-300 underline'>políticas de privacidade</span>.</p>
      </div>
    </main>
  )
}
