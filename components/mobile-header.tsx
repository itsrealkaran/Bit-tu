'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Menu } from 'lucide-react'

import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Sidebar } from '@/components/sidebar'

export function MobileHeader() {
  return (
    <div className="fixed top-0 z-50 flex h-[50px] w-full items-center border-b border-orange-100 bg-white px-4 lg:hidden">
      <Sheet>
        <SheetTrigger className="mr-4">
          <Menu className="h-6 w-6 text-orange-600" />
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-[256px]">
          <Sidebar />
        </SheetContent>
      </Sheet>
      <Link href="/learn">
        <div className="flex items-center gap-x-2">
          <Image src="/mascot.svg" alt="Mascot" height={32} width={32} />
          <span className="text-xl font-bold text-orange-600">Bit-tu</span>
        </div>
      </Link>
    </div>
  )
}