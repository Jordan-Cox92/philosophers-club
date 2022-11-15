import { useState } from "react"
import { useNavigate } from "react-router-dom"
import "./commentedFav.css"






export const CommentForm = ({ philosopherId, getAllComments }) => {
    const navigate = useNavigate()
    const [comment, update] = useState({
        content: ""
    })
    const [showcommentForm, setCommentForm] = useState(false)
    const [favPhilo, setFavPhilo] = useState([])
    const [filteredFavPhilo, setFilteredFavPhilo] = useState([])

    const localPhilosophyUser = localStorage.getItem("philosophy_user")
    const philosophyUserObject = JSON.parse(localPhilosophyUser)

    const saveButtonClick = (event) => {
        event.preventDefault()

        const commentToSendToAPI = {
            favoritePhilosopherId: philosopherId,
            userId: philosophyUserObject.id,
            content: comment.content


        }
        console.log(commentToSendToAPI)
        return fetch(` http://localhost:8088/comments`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(commentToSendToAPI)
        })
            .then(response => response.json())
            .then(() => {
                getAllComments()
            })

    }
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


    return (<>
        {!showcommentForm ? <>
            <button onClick={() => deleteFavoritePhilosophers(filteredFavPhilo)}>Delete Philosopher</button>
            <button onClick={() => { setCommentForm(true) }}>Add Comment</button></> : <><form className="commentForm">
                <h2 className="commentForm__title">New Comment</h2>
                <fieldset>
                    <div className="form-group">
                        <label htmlFor="description"></label>
                        <input
                            required autoFocus
                            type="text"
                            className="form-control"
                            placeholder="Leave a comment here"
                            value={comment.content}
                            onChange={
                                (evt) => {
                                    const copy = { ...comment }
                                    copy.content = evt.target.value
                                    update(copy)
                                }
                            } />
                    </div>
                </fieldset>

                <button
                    onClick={(clickEvent) => {
                        saveButtonClick(clickEvent)
                        setCommentForm(false)
                    }}
                    className="btn btn-primary">
                    Submit Comment
                </button>
            </form>
        </>
        }
    </>
    )
}