import { Outlet, Route, Routes } from "react-router-dom"
import { EditComments } from "../philosophers/EditComments"
import { FavoritePhilosophers } from "../philosophers/FavoritePhilosophers"
import { PhilosopherList } from "../philosophers/PhilosopherList"

export const ApplicationViews = () => {
    return (
        <Routes>
            <Route path="/" element={
                <>

                    <h1>Philosopher's Club</h1>
                    <div>Learning about the World's Greatest Philosophers</div>

                    <Outlet />
                </>
            }>

                <Route path="philosophers" element={<PhilosopherList />} />
                <Route path="favoritephilosophers" element={< FavoritePhilosophers />} />
                <Route path="favoritephilosophers/:commentId" element={< EditComments />} />
            </Route>
        </Routes>
    )
}