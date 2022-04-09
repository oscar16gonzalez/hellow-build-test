import { Routes, Route, BrowserRouter } from "react-router-dom"
import Login from "../components/auth/login/Login"
import Resgister from "../components/auth/register/Register"
import Favorite from "../components/FavoriteRepo/Favorite"
import Home from "../components/Home/Home"

export const MainRoute = () => {
    return (
        <BrowserRouter>
            <div>
                <Routes>
                    <Route path="/*" element={<Login />}></Route>
                    <Route path="/home" element={<Home />}></Route>
                    <Route path="/register" element={<Resgister />}></Route>
                    <Route path="/favorites" element={<Favorite />}></Route>
                </Routes>
            </div>
        </BrowserRouter>
    )
}
