import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";



export const EditComments = ({ philosopherId }) => {
    const navigate = useNavigate()
    //we need to be able to access whatever the changeable piece of the route (commentId) (see app views) actually is.
    //useParams allows us to grab route parameters from the route 
    //and then we can destructure the route paramaters we want
    const { commentId } = useParams()
    const [philosopher, setPhilosophers] = useState([])
    const [comment, setComment] = useState({
        content: "",


    })

    const localPhilosophyUser = localStorage.getItem("philosophy_user")
    const philosophyUserObject = JSON.parse(localPhilosophyUser)



    useEffect(() => {
        fetch(`http://localhost:8088/comments/${commentId}`)
            .then(response => response.json())
            .then((comment) => {
                setComment(comment)
            })
    },
        [commentId])

    useEffect(() => {
        fetch(` http://localhost:8088/favoritePhilosophers`)
            .then(response => response.json())
            .then((data) => {
                setPhilosophers(data)
            })
    },
        [])

    const handleSaveButtonClick = (event) => {
        event.preventDefault()

        const newComment = {
            favoritePhilosopherId: comment.favoritePhilosopherId,
            userId: philosophyUserObject.id,
            content: comment.content


        }
        // this will post new userChoices ticket to database


        {
            fetch(`http://localhost:8088/comments/${comment.id}`, {
                //put is to update your data.
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newComment),
            })
                .then((response) => response.json())
                .then(() => navigate("/favoritephilosophers"))
        }
    }
    return <>
        <form>

            <h2 className="commentForm__title">Edit Comment</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description"></label>
                    <input
                        required autoFocus
                        type="text"
                        className="form-control"
                        value={comment.content}
                        onChange={
                            (evt) => {
                                const copy = { ...comment }
                                copy.content = evt.target.value
                                setComment(copy)
                            }
                        } />
                </div>
            </fieldset>

            <button
                onClick={(Event) => {
                    handleSaveButtonClick(Event)

                }}
                className="btn btn-primary">
                Submit Update
            </button>
        </form>
    </>
}




