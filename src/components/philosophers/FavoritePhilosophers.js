import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { CommentForm } from "./commentedFavPhilosophers"
import "./FavoritePhilosophers.css"






export const FavoritePhilosophers = () => {
    const navigate = useNavigate()
    const [favPhilo, setFavPhilo] = useState([])
    const [filteredFavPhilos, setFilteredFavPhilo] = useState([])
    const [philoComments, setPhiloComments] = useState([])
    const [showcommentForm, setCommentForm] = useState(false)

    const localPhilosophyUser = localStorage.getItem("philosophy_user")
    const philosophyUserObject = JSON.parse(localPhilosophyUser)


    //function to grab all of the favorite philosophers
    const getAllFavoritePhilosophers = () => {
        fetch(` http://localhost:8088/favoritePhilosophers?_expand=philosopher&userId=${philosophyUserObject.id}`)
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

    //filter to show me only the favorite philosophers that meet the condition of the userid on the philosopher matching the id of the logged in user.
    useEffect(
        () => {
            const userPhilosophers = favPhilo.filter(philosopher => philosopher.userId === philosophyUserObject.id)
            setFilteredFavPhilo(userPhilosophers)
        },
        [favPhilo]
    )





    const deleteFavoritePhilosophers = (favoritePhilosopher) => {
        fetch(`http://localhost:8088/favoritePhilosophers/${favoritePhilosopher.id}`, {
            method: "DELETE"
        })
            .then(() => {
                getAllFavoritePhilosophers()
            })

    }
    //function to get all the comments
    const getAllComments = () => {
        fetch(`  http://localhost:8088/comments`)
            .then(response => response.json())
            .then((commentsArray) => {
                setPhiloComments(commentsArray)
            })
    }
    //invoke getAllComments function 
    useEffect(
        () => {
            getAllComments()
        },
        []
    )
    //function to display the comments of 
    const displayComments = (filteredFavPhilo) => {

        const filteredComments = philoComments.filter((comment) =>
            comment.userId === filteredFavPhilo.userId && comment.favoritePhilosopherId === filteredFavPhilo.id
        )
        return filteredComments.map((comment) => {
            return <div className="comments" key={comment.id}>{comment.content}

                <button onClick={() => navigate(`/favoritephilosophers/${comment.id}`)}>Edit Comment</button></div>
        })
    }






    return <>
        <h2>Your Favorite Philosophers</h2>

        <article className="savedPhilosophers">
            {

                filteredFavPhilos.map(
                    (filteredFavPhilo) => {
                        return <div key={filteredFavPhilo.id} className="savedPhilosopher">
                            <h2>{filteredFavPhilo.philosopher.name}</h2>
                            <h2 className="philoLife">{filteredFavPhilo?.philosopher.Life}</h2>
                            <h3> {filteredFavPhilo.philosopher.school}</h3>
                            <div>
                                <img key={filteredFavPhilo.id} src={filteredFavPhilo.philosopher.imageURL}
                                    alt="philosopher pics" width="100" height="200" />
                            </div>
                            {!showcommentForm ? <><button onClick={() => deleteFavoritePhilosophers(filteredFavPhilo)}>Delete Philosopher</button>
                                <button onClick={() => { setCommentForm(true) }}>Add Comment</button></> : <><CommentForm philosopherId={filteredFavPhilo.id} getAllComments={getAllComments} /></>}


                            <ul>{displayComments(filteredFavPhilo)}</ul>



                        </div>

                    }
                )
            }
        </article>
    </>


}

//(see line 102) if the comment form is NOT showing, show delete button and add comment button.  Else, show comment form.