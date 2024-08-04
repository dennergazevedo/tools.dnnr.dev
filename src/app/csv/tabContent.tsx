import { CSVJSON } from "./tools/csvjson"
import { JSONCSV } from "./tools/jsoncsv"

interface TabContentProps{
  currentTab: string
}

export function TabContent({ currentTab }: TabContentProps) {
  switch(currentTab){
    case 'jsoncsv':
      return <JSONCSV />

    case 'csvjson':
      return <CSVJSON />
    
    default:
      return <JSONCSV />
  }
}