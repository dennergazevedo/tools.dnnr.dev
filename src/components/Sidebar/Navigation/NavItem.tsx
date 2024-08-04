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
      className="group flex items-center gap-3 rounded px-3 py-2 outline-none hover:bg-sky-50 focus-visible:ring-2 focus-visible:ring-sky-500 dark:hover:bg-zinc-800"
    >
      <Icon className="h-5 w-5 flex-shrink-0 text-zinc-500" />
      <span className="font-medium text-zinc-700 group-hover:text-sky-500 dark:text-zinc-100 dark:group-hover:text-sky-300">
        {title}
      </span>
    </Link>
  )
}
