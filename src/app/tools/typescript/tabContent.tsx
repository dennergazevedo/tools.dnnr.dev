import { JsonToTS } from "./tools/JsonToTS"

interface TabContentProps{
  currentTab: string
}

export function TabContent({ currentTab }: TabContentProps) {
  switch(currentTab){
    case 'jsonts':
      return <JsonToTS />
    
    default:
      return <JsonToTS />
  }
}