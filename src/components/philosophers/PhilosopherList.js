import { useEffect, useState } from "react"
import "./Philosophers.css"

export const PhilosopherList = () => {
    //react hook useState used to capture/maintain the state
    const [philosophers, setPhilosophers] = useState([])
    const [filteredPhilosophers, setFiltered] = useState([])
    const [favPhilo, setFavPhilo] = useState([])

    const localPhilosophyUser = localStorage.getItem("philosophy_user")
    const philosophyUserObject = JSON.parse(localPhilosophyUser)



    const getAllPhilosophers = () => {
        fetch(`http://localhost:8088/philosophers`)
            .then(response => response.json())
            .then((philosopherArray) => {
                setPhilosophers(philosopherArray)
            })
    }



    useEffect(
        () => { getAllPhilosophers() },
        []
    )

    const getAllFavoritePhilosophers = () => {
        fetch(` http://localhost:8088/favoritePhilosophers`)
            .then(response => response.json())
            .then((savedPhilosophersArray) => {
                setFavPhilo(savedPhilosophersArray)
            })
    }

    useEffect(
        () => {
            getAllFavoritePhilosophers()
        },
        []
    )



    const savePhilosopher = (philosopher) => {
        fetch(`http://localhost:8088/favoritePhilosophers`, {
            method: "POST", // used to send data to a server to create/update a resource.
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ "philosopherId": philosopher.id, "userId": philosophyUserObject.id, })//converting object into a string - when sending data to a web server, the data has to be a string
        })
            .then(response => response.json())
            .then(() => {
                //navigate("/")
                getAllPhilosophers()
                window.alert("Your Chosen Philosopher has been Added to Your Favorite Philosophers")
            })
    }







    return <>
        <h2>List Of Philosophers</h2>

        <article className="philosophers">
            {
                philosophers.map(
                    (philosopher) => {
                        return <section key={philosopher.id} className="philosopher">
                            <header>{philosopher.name}</header>
                            <footer>{philosopher.school}</footer>
                            <button onClick={() => { savePhilosopher(philosopher) }}>save</button>
                        </section>
                    }
                )
            }
        </article>
    </>
}