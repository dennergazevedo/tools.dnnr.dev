import Link from "next/link"
import { ElementType } from "react"

interface HomeCardProps{
  icon: ElementType
  href: string
  label: string
  description: string
}

export default function HomeCard({href, icon: Icon, label, description}: HomeCardProps) {
  return (
    <Link href={href} className="flex flex-col pointer md:w-60 p-8 items-start justify-start gap-4 rounded border border-zinc-500 hover:bg-zinc-800 group">
      <div className="flex flex-row gap-4 items-center">
        <Icon className="h-8 w-8 flex-shrink-0 text-zinc-500 group-hover:text-sky-500"/>
        <span className="text-slate-300 font-bold group-hover:text-sky-200">{label}</span>
      </div>
      <p className="text-xs text-zinc-500 leading-4 group-hover:text-white">{description}</p>
    </Link>
  )
}
