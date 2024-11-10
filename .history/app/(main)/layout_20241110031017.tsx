import type { PropsWithChildren } from 'react'

// import { MobileHeader } from '@/components/mobile-header'
import { Sidebar } from '@/components/sidebar'

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <div className="h-full bg-white text-slate-900">
      {/* <MobileHeader /> */}
      <Sidebar className="hidden lg:flex" />
      <main className="h-full pt-[50px] lg:pl-[246px] lg:pt-0">
        <div className="mx-auto h-full max-w-[1056px] pt-6 px-4">{children}</div>
      </main>
    </div>
  )
}