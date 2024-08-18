import { Fragment } from 'react'
import Form from './form'
import { Mail } from 'lucide-react'

export default function Support() {
  return (
    <Fragment>
      <h1 className="text-3xl font-medium text-zinc-100">
        Suport
      </h1>
      <div className="mt-6 flex flex-col">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-medium text-zinc-900 text-white">
              Have some questions?
            </h2>
            <span className="text-sm text-zinc-500 text-zinc-400">
              Please fill out the form below, and our support team will get back to you shortly.
            </span>
          </div>
        </div>
        <div className='flex flex-row flex-wrap relative mt-12 w-full gap-8 justify-around items-center md:mt-24'>
          <div className="hidden flex-1 items-center justify-center md:flex md:opacity-100">
            <Mail className="w-80 h-80 flex-shrink-0 text-zinc-700" />
          </div>
          <Form />
        </div>
      </div>
    </Fragment>
  )
}
