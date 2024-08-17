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
      <NavItem icon={Home} title="Home" to='/tools' />
      <NavItem icon={ListChecks} title="To Do" to='/tools/todo' />
      <NavItem icon={AlarmClock} title="Timer" to='/' />
      <NavItem icon={Code2} title="Typescript" to='/tools/typescript' />
      <NavItem icon={Layers} title="CSV • JSON" to='/tools/csv' />
      <NavItem icon={Ampersands} title="Base64" to='/tools/base64' />
      <NavItem icon={FileCode2} title="URI" to='/tools/uri' />
    </nav>
  )
}
