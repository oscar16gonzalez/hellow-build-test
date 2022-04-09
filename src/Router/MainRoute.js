import { Routes, Route, BrowserRouter } from "react-router-dom"
import Login from "../components/auth/login/Login"
import Home from "../components/Home/Home"

export const MainRoute = () => {
    return (
        <BrowserRouter>
            <div>
                <Routes>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/home" element={<Home />}></Route>
                </Routes>
            </div>
        </BrowserRouter>
    )
}
