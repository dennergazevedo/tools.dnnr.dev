import { Hammer } from 'lucide-react'

export function Logo() {
  return (
    <strong className="mx-1 flex items-center gap-2 text-xl font-semibold text-zinc-900 text-zinc-100">
      <div className='h-8 w-8 flex justify-center items-center bg-slate-50 rounded border-b-2 border-sky-500'>
        <Hammer className="h-5 w-5 flex-shrink-0 text-sky-500" />
      </div>
      <span className="sr-only lg:not-sr-only">Tools</span>
    </strong>
  )
}
