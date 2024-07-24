'use client'

import { cn } from '@/utils/cn'
import { XIcon } from 'lucide-react'
import { ClassNameValue } from 'tailwind-merge'

interface ModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  children?: React.ReactNode
  className?: ClassNameValue
}

export function Modal({ children, className, open, onOpenChange }: ModalProps) {

  return (
    <dialog open={open}>
      <div
        onClick={() => onOpenChange(false)}
        className='inset-0 fixed bg-black w-full h-full bg-opacity-60 flex items-center justify-center'>
        <div className={cn('fixed top-[5%] translate-y-0 w-full max-w-[460px] bg-zinc-900 flex flex-col justify-start items-start gap-5 px-6 py-5 rounded-xl', className)}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </div>
    </dialog>
  )
}
