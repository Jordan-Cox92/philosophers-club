import { useState } from "react"
import { PhilosopherList } from "./PhilosopherList"
import { PhilosopherSearch } from "./PhilosopherSearch"

export const PhilosopherContainer = () => {
    const [searchTerms, setSearchTerms] = useState("")
    //TicketSearch and TicketList cannot directly share state with each other
    //Therefore, we have to put them both together inside a parent component (TicketContainer)
    //You have to take the state that you want to share between them, put them in the parent (searchTerms, setSearchTerms)
    //Then pass the state to one component, and pass the setterFunction to a different component.
    //These (setterFunction) are called props - you can think of them as object keys and values; properties on objects


    return <>
        <PhilosopherSearch setterFunction={setSearchTerms} />
        <PhilosopherList searchTermState={searchTerms} />
    </>
}