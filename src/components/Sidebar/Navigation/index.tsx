import {
  Home,
  FileCode2,
  Ampersands,
  Braces,
  AlarmClock,
  ListChecks,
  Layers,
  Code2
} from 'lucide-react'

import { NavItem } from './NavItem'

export interface NavigationProps {}

export function Navigation(props: NavigationProps) {
  return (
    <nav className="flex flex-col gap-0.5">
      <NavItem icon={Home} title="Home" to='/' />
      <NavItem icon={ListChecks} title="To Do" to='/' />
      <NavItem icon={AlarmClock} title="Timer" to='/' />
      <NavItem icon={Code2} title="Typescript" to='/' />
      <NavItem icon={Braces} title="JSON" to='/' />
      <NavItem icon={Layers} title="CSV" to='/' />
      <NavItem icon={Ampersands} title="Base64" to='/base64' />
      <NavItem icon={FileCode2} title="Encode ~ Decode" to='/' />
    </nav>
  )
}
