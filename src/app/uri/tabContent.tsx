import { EncodeDecodeURI } from "./tools/encodeDecodeURI"

interface TabContentProps{
  currentTab: string
}

export function TabContent({ currentTab }: TabContentProps) {
  switch(currentTab){
    case 'encodeDecode':
      return <EncodeDecodeURI />
    
    default:
      return <EncodeDecodeURI />
  }
}