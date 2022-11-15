import { useEffect, useState } from "react"
import { Philosopher } from "./Philosopher"
import "./Philosophers.css"

export const PhilosopherList = (searchTermState) => {
    //react hook useState used to capture/manage the state of philosophers, and a function to change the state of philosophers
    const [philosophers, setPhilosophers] = useState([])
    const [filteredPhilosophers, setFiltered] = useState([])
    const [favPhilo, setFavPhilo] = useState([])




    const localPhilosophyUser = localStorage.getItem("philosophy_user")
    const philosophyUserObject = JSON.parse(localPhilosophyUser)

    useEffect(
        () => {
            const searchedPhilosophers = philosophers.filter(philosopher => {
                return philosopher.name.toLowerCase().startsWith(searchTermState.toLowerCase())
            })
            setFiltered(searchedPhilosophers)
        },
        [searchTermState]
    )





    const getAllPhilosophers = () => {
        fetch(`http://localhost:8088/philosophers`)
            .then(response => response.json())
            .then((philosopherArray) => {
                setPhilosophers(philosopherArray)
            })
    }


    //useEffect to watch state and do something whenever state changes
    useEffect(
        () => {
            getAllPhilosophers()

        },
        []
    )

    const getAllFavoritePhilosophers = () => {
        fetch(` http://localhost:8088/favoritePhilosophers?userId=${philosophyUserObject.id}`)
            .then(response => response.json())
            .then((savedPhilosophersArray) => {
                setFavPhilo(savedPhilosophersArray)
            })
    }

    useEffect(
        () => {
            getAllFavoritePhilosophers()
        },
        [philosophers]
    )



    const savePhilosopher = (philosopher) => {
        fetch(`http://localhost:8088/favoritePhilosophers`, {
            method: "POST", // used to send data to a server to create/update a resource.
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "philosopherId": philosopher.id, "userId": philosophyUserObject.id, })//converting object into a string - when sending data to a web server, the data has to be a string
        })

            .then(() => {
                //navigate("/")
                getAllPhilosophers()


            })
    }










    return <>
        <h2>List Of Philosophers</h2>

        <article className="philosophers">
            {
                philosophers.map(
                    (philosopher) => {
                        return <Philosopher key={philosopher.id} philosopher={philosopher} savePhilosopher={savePhilosopher} favPhilo={favPhilo} />

                    }
                )
            }
        </article>
    </>
}