import {Routes, Route, BrowserRouter} from "react-router-dom"
import {Login, Home, ProtectedRoute, UserAuth} from "../index"


export function MyRoutes() {
    const { user } = UserAuth();

    return (
<BrowserRouter>
    <Routes>
       <Route path="/Login" element={<Login />} />
       <Route element={<ProtectedRoute user={user} redirectTo="/login" />}>
          <Route path="/" element={<Home />} />
       </Route>
       
    </Routes>
</BrowserRouter>
    )
}