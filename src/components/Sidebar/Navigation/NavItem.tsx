import Link from 'next/link'
import { ElementType } from 'react'

interface NavItemProps {
  title: string
  icon: ElementType
  to: string
}

export function NavItem({ title, icon: Icon, to }: NavItemProps) {
  return (
    <Link
      href={to}
      className="group flex items-center gap-3 rounded px-3 py-2 outline-none hover:bg-zinc-800 focus-visible:ring-2 focus-visible:ring-sky-50"
    >
      <Icon className="h-5 w-5 flex-shrink-0 text-zinc-500 group-hover:text-sky-500" />
      <span className="font-medium group-hover:text-sky-500 text-zinc-100">
        {title}
      </span>
    </Link>
  )
}
