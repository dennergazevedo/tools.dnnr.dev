import {
  Home,
  FileCode2,
  Ampersands,
  AlarmClock,
  ListChecks,
  Layers,
  Code2
} from 'lucide-react'

import { NavItem } from './NavItem'

export function Navigation() {
  return (
    <nav className="flex flex-col gap-0.5">
      <NavItem icon={Home} title="Home" to='/' />
      <NavItem icon={ListChecks} title="To Do" to='/' />
      <NavItem icon={AlarmClock} title="Timer" to='/' />
      <NavItem icon={Code2} title="Typescript" to='/typescript' />
      <NavItem icon={Layers} title="CSV • JSON" to='/csv' />
      <NavItem icon={Ampersands} title="Base64" to='/base64' />
      <NavItem icon={FileCode2} title="URI" to='/uri' />
    </nav>
  )
}
