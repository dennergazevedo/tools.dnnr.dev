import { Fragment } from 'react'

export default function Home() {
  return (
    <Fragment>
      <h1 className="text-3xl font-medium text-zinc-900 dark:text-zinc-100">
        Get Started
      </h1>
      <div className="mt-6 flex flex-col">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div className="flex flex-col gap-1">
            <h2 className="text-lg font-medium text-zinc-900 dark:text-white">
              Welcome!
            </h2>
            <span className="text-sm text-zinc-500 dark:text-zinc-400">
              Here you will find some useful tools for your daily life as a Developer.
            </span>
          </div>
        </div>
      </div>
    </Fragment>
  )
}
