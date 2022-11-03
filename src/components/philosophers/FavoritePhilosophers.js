import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { CommentForm } from "./commentedFavPhilosophers"






export const FavoritePhilosophers = () => {
    const navigate = useNavigate()
    const [favPhilo, setFavPhilo] = useState([])
    const [filteredFavPhilos, setFilteredFavPhilo] = useState([])
    const [philoComments, setPhiloComments] = useState([])
    const [showcommentForm, setCommentForm] = useState(false)

    const localPhilosophyUser = localStorage.getItem("philosophy_user")
    const philosophyUserObject = JSON.parse(localPhilosophyUser)


    useEffect(
        () => {
            getAllFavoritePhilosophers()
        },
        []
    )


    useEffect(
        () => {
            const userPhilosophers = favPhilo.filter(philosopher => philosopher.userId === philosophyUserObject.id)
            setFilteredFavPhilo(userPhilosophers)
        },
        [favPhilo]
    )




    const getAllFavoritePhilosophers = () => {
        fetch(` http://localhost:8088/favoritePhilosophers?_expand=philosopher&userId=${philosophyUserObject.id}`)
            .then(response => response.json())
            .then((savedPhilosophersArray) => {
                setFavPhilo(savedPhilosophersArray)
            })
    }

    const deleteFavoritePhilosophers = (favoritePhilosopher) => {
        fetch(`http://localhost:8088/favoritePhilosophers/${favoritePhilosopher.id}`, {
            method: "DELETE"
        })
            .then(() => {
                getAllFavoritePhilosophers()
            })

    }

    const getAllComments = () => {
        fetch(`  http://localhost:8088/comments`)
            .then(response => response.json())
            .then((commentsArray) => {
                setPhiloComments(commentsArray)
            })
    }

    useEffect(
        () => {
            getAllComments()
        },
        []
    )

    const displayComments = (filteredFavPhilo) => {

        const filteredComments = philoComments.filter((comment) =>
            comment.userId === filteredFavPhilo.userId && comment.favoritePhilosopherId === filteredFavPhilo.id
        )
        return filteredComments.map((comment) => {
            return <li key={comment.id}>{comment.content}
                <button onClick={() => navigate(`/favoritephilosophers/${comment.id}`)}>Edit Comment</button></li>
        })
    }




    return <>
        <h2>Your Favorite Philosophers</h2>

        <article className="savedPhilosophers">
            {

                filteredFavPhilos.map(
                    (filteredFavPhilo) => {
                        return <section key={filteredFavPhilo.id} className="savedPhilosopher">
                            <header>{filteredFavPhilo.philosopher.name}</header>
                            <footer> {filteredFavPhilo.philosopher.school}</footer>
                            {!showcommentForm ? <><button onClick={() => deleteFavoritePhilosophers(filteredFavPhilo)}>Delete Philosopher</button>
                                <button onClick={() => { setCommentForm(true) }}>Add Comment</button></> : <><CommentForm philosopherId={filteredFavPhilo.id} getAllComments={getAllComments} /></>}

                            <ul>{displayComments(filteredFavPhilo)}</ul>



                        </section>

                    }
                )
            }
        </article>
    </>


}