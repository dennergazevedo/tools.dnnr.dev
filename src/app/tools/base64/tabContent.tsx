import { ToBase64 } from "./tools/Base64"

interface TabContentProps{
  currentTab: string
}

export function TabContent({ currentTab }: TabContentProps) {
  switch(currentTab){
    case 'encodeDecode':
      return <ToBase64 />
    
    default:
      return <ToBase64 />
  }
}