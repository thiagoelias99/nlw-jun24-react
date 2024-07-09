import Image from 'next/image'

export default function Header() {
  return (
    <header>
      <div className='w-full flex items-center justify-center'>
        <Image src='/logo.png' alt='plann.er logo' width={170} height={44} />
      </div>
      <p className='text-zinc-300 text-lg w-full text-center mt-2'>Convide seus amigos e planeje sua próxima viagem!</p>
    </header>
  )
}
