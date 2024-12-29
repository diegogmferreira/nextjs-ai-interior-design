'use client'

import { UserDetailContext } from '@/app/_context/user-detail-context'
import { Button } from '@/components/ui/button'
import { UserButton } from '@clerk/nextjs'
import { Star } from '@phosphor-icons/react'
import Image from 'next/image'
import { useContext } from 'react'
import logoImg from '../../../../public/logo.svg'

export function Header() {
  const { userDetail, seUserDetail } = useContext(UserDetailContext)

  return (
    <header className='p-5 shadow-sm flex justify-between items-center '>
      <div className='flex gap-2 items-center'>
        <Image src={logoImg} width={32} height={32} alt="Logo" />
        <h4 className='font-bold text-lg'>AI Interior Design</h4>
      </div>

      <Button
        variant="ghost"
      >
        Buy more credits
      </Button>

      <div className='flex gap-8 items-center'>
        <div className='flex items-center gap-2 bg-slate-200 px-3 p-1 rounded-full'>
          <Star size={20} weight='fill' className='text-yellow-500' />
          {userDetail?.credits}
        </div>
        <UserButton />
      </div>


    </header>
  )
}